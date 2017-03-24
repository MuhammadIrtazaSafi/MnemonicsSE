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
          
          req.session.regenerate(function(err){
            console.log("ERROR " + err);
            req.session.user = user;
            console.log(req.sessionID);
            res.status(200).end();
          });
          
        })
        .catch(function(err){
          res.status(400).end();
        })
      });
    });
  },
  login : function(req, res){
    var login_info = {
      username : req.body.username,
      password : req.body.password
    }
    var q = "SELECT * FROM users WHERE username ='" +login_info.username +"';";
    var promise = db.executeQuery(q);
    promise.then(function(rows){
      user = rows['rows'][0];
      console.log(user);
      salt = user.salt;
      hash = user.hash;
      
      bcrypt.hash(login_info.password, salt, function(err, ret_hash){
        if(ret_hash == hash){
          console.log("MATCH " + user);
          req.session.user = user;
          console.log(req.sessionID);
          req.session.regenerate(function(err){
            console.log("ERROR " + err);
            res.json({'sid' : req.session.id}).status(200).end();
          });
        }
      })
      //check user hash/salt and send user session to frontend
    })
    .catch(function(err){
      console.log(err);
      res.status(400).end();
    })
  }
}

