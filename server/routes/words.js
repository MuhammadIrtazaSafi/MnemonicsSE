var db = require('../database/db.js');

module.exports = {
  words : function(req, res){
    q = "SELECT * FROM words";
    var promise = db.executeQuery(q);
    promise.then(function(result){
      res.json(result.rows).status(200).end();
    });
  },
  addMnemonic : function(req,res){
    q = "(SELECT user_id FROM users WHERE username ='"+req.session.user.username+"')";
    x = "INSERT INTO mnemonics (user_id, word_id, mnemonic, lat, long, rating) VALUES ("+q+",'"+req.body.word_id+"','"+ req.body.mnemonic+"','"+ req.body.lat+"','"+ req.body.long+"',0)";
    var promise = db.executeQuery(x);
    promise.then(function(result){  
      res.status(200).end();
    })
    .catch(function(err){
      res.status(400).end();
    })
  },
  getUserMnemonic : function(req,res){
    q = "(SELECT user_id FROM users WHERE username ='"+req.session.user.username+"')";
    x = "SELECT * FROM mnemonics WHERE user_id = "+q+" AND word_id = '"+req.query.word_id+"'";
    var promise = db.executeQuery(x);
    promise.then(function(result){  
      res.json(result.rows).end();
    })
    .catch(function(err){
      res.status(400).end();
    })
   },
   locationMnemonics : function(req, res){
    user_lat = parseFloat(req.query.lat)
    user_long = parseFloat(req.query.long)
    q = 'select w.word_id, w.word, w.def, m.mn_id, m.mnemonic FROM words w, mnemonics m WHERE (m.lat BETWEEN ' + (user_lat - .2) + ' and ' + (user_lat + .2) + ') AND (m.long BETWEEN ' +(user_long - .2) + ' and ' + (user_long + .2) + ') AND m.word_id = w.word_id;' 
    var promise = db.executeQuery(q);
    promise.then(function(result){
      res.json(result.rows).status(200).end();  
    })
    .catch(function(err){
      console.log(err);
      res.status(400).end();
    })
   }

}
