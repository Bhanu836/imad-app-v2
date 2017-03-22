var express = require('express');
var morgan = require('morgan');
var path = require('path');
var qs = require("querystring");
var Pool = require('pg').Pool;
var crypto = require('crypto');
var session = require('express-session');

var bodyParser = require('body-parser');





var config = {    
     user: 'bhanu836',
     database :'bhanu836',
     host: 'db.imad.hasura-app.io',
     port: '5432',
     password:'db-bhanu836-7434'
      };
     
     
    var app = express();
    app.use(morgan('combined'));
    
  var pool = new Pool(config);
app.get('/test-db', function(req,res){
    pool.query('SELECT * FROM test' , function(err,result){
        if(err){
          res.status(500).send(err.toString());  
        }else{
            res.send(JSON.stringify(result));
           
        }
    });
}); 

app.use(session({
    secret:'blackdugsecret',
    cookie:{maxage:1000*60*60*24*30}
}));
app.get('/index.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/',function(req,res){
 res.sendFile(path.join(__dirname,'ui','practice4.html'));
});
app.get('/ui/comment.html',function(req,res){
 res.sendFile(path.join(__dirname,'ui','comment.html'));
});
app.get('/ui/practice4.js',function(req,res){
 res.sendFile(path.join(__dirname,'ui','practice4.js'));
});
app.get('/ui/main.js',function(req,res){
 res.sendFile(path.join(__dirname,'ui','main.js'));
});
app.get('/ui/prac4.css',function(req,res){
 res.sendFile(path.join(__dirname,'ui','prac4.css'));
});
 

app.use(bodyParser.json());

 function hash(input,salt){
     var hashed = crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
     return ["pbkdf2","1000",salt, hashed.toString('hex')].join('$');
 }
app.get('/hash/:input' , function(req,res){
    var hashstring =hash(req.params.input,'some-random-string');
    res.send(hashstring);
    
});
app.post('/login', function(req,res)
{
     var username = req.body.username;
    var password = req.body.password;
    console.log(username);
   pool.query('SELECT * FROM "user" WHERE username = $1',[username], function(err,result){
       if(err)
       {
           res.status(500).send(err.toString());
       }else{
          if(result.rows.length === 0){
              res.status(403).send("no username exist");
          }else{
              var dbstring = result.rows[0].password;
             var salt = dbstring.split('$')[2];
              var hashedPassword = hash(password,salt);
              if(hashedPassword === dbstring){
                  req.session.outh={userid:result.rows[0].id ,username:result.rows[0].username};
                  res.set('Content-Type', 'text/html');
                  res.send(new Buffer('<p>you are logged in</p>'));
                  res.send('<p>you are logged in</p>');
              }else{
                  res.send(403).send("username is invalid");
              }
          }
       }
   });
    
});
app.post('/create-user', function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    var salt = crypto.randomBytes(128).toString('hex');
   var dbstring = hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbstring], function(err,result){
       if(err)
       {
           res.status(500).send(err.toString());
       }else{
           res.send('user successful' + username);
       }
   });
});

app.get('/check-login',function(req,res){
   if(req.session && req.session.outh && req.session.outh.userid) {
       res.send("user  is logged in :");
   }
   else{
   
       
   res.send("error");
   }
});
app.get('/logout',function(req,res){
   delete req.session.outh;
   res.send("you are logged out");
});
app.get('/get-comments/:articleName', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});
app.post('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!')
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});

app.get('/articles/:articleName', function (req, res) {
  // SELECT * FROM article WHERE title = '\'; DELETE WHERE a = \'asdf'
  pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
  });
});

app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
