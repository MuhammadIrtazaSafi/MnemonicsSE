var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
module.exports = app;

var user_routes = require('./routes/users.js');
var vote_routes = require('./routes/votes.js');
var word_routes = require('./routes/words.js');

//Example endpoint. 
app.get('/test', user_routes.test);

var port = 8000;
app.listen(port);
console.log("Mnemonics server is listening on port: " + port);
