var express = require('express');
var morgan = require('morgan');
var path = require('path');
var qs = require("querystring");
var pool =require('pg').Pool;
var crypto = require('crypto');
var app = express();
var bodyParser = require('body-parser');
app.use(morgan('combined'));


app.use(bodyParser.json());

var config = {
    user: 'bhanu836',
    database: 'bhanu836',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD,
    
    };
    var pool = new pool(config);

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
 function hash(input,salt){
     var hashed = crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
     return hashed.toString('hex');
 }
app.get('/hash/:input' , function(req,res){
    var hashstring =hash(req.params.input,'some-random-string');
    res.send(hashstring);
    
});
app.post('/create-user',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var salt =crypto.getRandomBytes(128).toString('hex');
   var dbstring = hash(password,salt);
   pool.query('INSERT INTO "user"(username,password) VALUES ($1,$2)',[username,dbstring], function(err,result){
       if(err)
       {
           res.status.send(err.toString());
       }else{
           res.user('user successful' + username);
       }
   });
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
