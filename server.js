var express = require('express');
var morgan = require('morgan');
var path = require('path');
var qs = require("querystring");
var Pool = require('pg').Pool;
var crypto = require('crypto');


var bodyParser = require('body-parser');





var config = {    
    user: 'bhanu836',
     database :'bhanu836',
     host: 'http://db.imad.hasura.app.io',
     port: '5432',
     password : process.env.DB_PASSWORD
      };
     
     
    var app = express();
    app.use(morgan('combined'));
    
  var pool = new Pool(config);
app.get('/test-db', function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
          res.status(500).send(err.toString());  
        }else{
            res.send(JSON.stringify(result));
            console.log(JSON.stringify(result));
        }
    });
}); 

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
app.get('/ui/practice4.js',function(req,res){
 res.sendFile(path.join(__dirname,'ui','practice4.js'));
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
app.post('/login' , function(req,res)
{
     var username = req.body.username;
    var password = req.body.password;
    
   pool.query('SELECT * FROM "user" WHERE username = $1',[username], function(err,result){
       if(err)
       {
           res.status(500).send(err.toString());
       }else{
          if(result.rows.length === 0){
              res.send(403).send("no username exist");
          }else{
              var dbstring = result.rows[0].password;
              dbstring.split('$')[2];
              var hashedPassword = hash(password,salt);
              if(hashedPassword === dbstring){
                  res.send('you are logged in');
              }else{
                  res.send(403).send("username is invalid");
              }
          }
       }
   });
    
});
app.post('/create-user',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
   var dbstring = hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbstring], function(err,result){
       if(err)
       {
           res.status(500).send(err.toString());
       }else{
           res.user('user successful' + username);
       }
   });
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
