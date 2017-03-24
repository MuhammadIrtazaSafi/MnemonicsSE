var db = require('../database/db.js');

module.exports = {
  words : function(req, res){
    q = "SELECT * FROM words";
    var promise = db.executeQuery(q);
    promise.then(function(result){
      res.json(result.rows);
    });
  },
  addMnemonic : function(req,res){
    q = "(SELECT user_id FROM users WHERE username ='"+req.session.user.username+"')";
    x = "INSERT INTO mnemonics (user_id, word_id, mnemonic, lat, long, rating) VALUES ("+q+",'"+req.body.word_id+"','"+ req.body.mnemonic+"','"+ req.body.lat+"','"+ req.body.long+"',0)";
    console.log(x); 
    var promise = db.executeQuery(x);
    promise.then(function(result){  
      res.status(200).end();
    })
    .catch(function(err){
      res.status(400).end();
    })
  }

}
