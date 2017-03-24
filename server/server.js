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
  var cook = req.cookies["connect.sid"];
  cook = cook.substring(cook.indexOf(':')+1, cook.indexOf('.'));
  if (req.session.user && cook == req.session.id) {
    next();
  }
  else{
    res.status(400).end();
  }
}


app.get('/test', restrict, user_routes.test);
app.post('/registerUser', user_routes.registerUser);
app.post('/login', user_routes.login);
app.post('/logout', restrict, user_routes.logout);

var port = 8000;
app.listen(port);
console.log("Mnemonics server is listening on port: " + port);
