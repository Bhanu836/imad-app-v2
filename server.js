var express = require('express');
var morgan = require('morgan');
var path = require('path');
var qs = require("querystring");
var pool =require('pg').Pool;

var app = express();
app.use(morgan('combined'));


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


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
