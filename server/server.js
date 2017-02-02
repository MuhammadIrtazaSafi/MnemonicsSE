var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var routes = require('../routes/routes.js');

//Example endpoint. 
app.get('/', routes.test);

var port = 8000;
app.listen(port);
console.log("Mnemonics server is listening on port: " + port);
