var db = require('../database/db.js');
var bcrypt = require('bcryptjs');

module.exports = {
  test : function(req, res){
    res.status(200).end();
  },
  registerUser : function(req, res){
    var user = {
      username : req.body.username,
      f_name : req.body.f_name,
      l_name : req.body.l_name,
      password : req.body.password
    }
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        var q = "INSERT INTO users (f_name, l_name, username, hash, salt) VALUES ('"+user.f_name +"'," + "'"+user.l_name +"'," + "'"+user.username +"'," + "'"+hash +"'," + "'"+salt +"');";
        console.log(q);
        var promise = db.executeQuery(q);
        promise.then(function(rows){
          
          req.session.regenerate(function(){
            req.session.user = user
            res.status(200).end();
          });
          
        })
        .catch(function(err){
          res.status(400).end();
        })
      });
    });
  }
}

