var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var sessionStore = require('connect-pg-simple');
var app = express();
var db = require('./database/db.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var conString = 'postgres://postgres@localhost/mnemonics';
app.use(session({
  store : new (sessionStore(session))({conString}),
  pg : db.pg,
  secret: "this is our cookie secret.",
  resave: false,
  saveUninitialized : true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 10000 } 
}));
module.exports = app;

var user_routes = require('./routes/users.js');
var vote_routes = require('./routes/votes.js');
var word_routes = require('./routes/words.js');

//Example endpoint. 
app.get('/test', user_routes.test);
app.post('/registerUser', user_routes.registerUser);
app.post('/login', user_routes.login);
app.get('/words', word_routes.words);
app.post('/mnemonic', word_routes.addMnemonic);

var port = 8000;
app.listen(port);
console.log("Mnemonics server is listening on port: " + port);
