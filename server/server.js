var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sessionStore = require('connect-pg-simple');
var app = express();
var db = require('./database/db.js');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
var conString = 'postgres://postgres@localhost/mnemonics';
app.use(session({
  store : new (sessionStore(session))({conString}),
  pg : db.pg,
  secret: "SO SECRET.",
  resave: true,
  saveUninitialized : false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 10000 } 
}));
module.exports = app;

var user_routes = require('./routes/users.js');
var vote_routes = require('./routes/votes.js');
var word_routes = require('./routes/words.js');


function restrict(req, res, next) {
  console.log(req.cookies);
  if (req.session.user && req.cookies["connect.sid"] == req.body.sid) {
    next();
  } 
}


app.get('/test', restrict, user_routes.test);
app.post('/registerUser', user_routes.registerUser);
app.post('/login', user_routes.login);
app.post('/logout', user_routes.logout);

var port = 8000;
app.listen(port);
console.log("Mnemonics server is listening on port: " + port);
