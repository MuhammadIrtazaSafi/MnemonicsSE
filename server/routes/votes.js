var db = require('../database/db.js');

module.exports = {
  test : function(req, res){
    res.send("server is up.");
  },
  addVote : function(req, res){
    var q = "UPDATE mnemonics SET rating=rating+1 WHERE mn_id="+req.body.mn_id+";";
    console.log(q);
    var promise = db.executeQuery(q);
    promise.then(function(rows){
      res.status(200).end();
    })
    .catch(function(err){
      res.stats(400).end();
    })
  },
  subtractVote : function(req, res){
    var q = "UPDATE mnemonics SET rating=rating-1 WHERE mn_id="+req.body.mn_id+";";
    var promise = db.executeQuery(q);
    promise.then(function(rows){
      res.status(200).end();
    })
    .catch(function(err){
      res.stats(400).end();
    })
  }
}
