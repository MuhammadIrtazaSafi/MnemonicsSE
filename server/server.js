var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Example endpoint. 
app.get('/', function(req ,res){
  res.send("Server is up.");
});


var port = 8000
app.listen(port);
console.log("Mnemonics server is listening on port: " + port);