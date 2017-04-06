var pg = require('pg');
var Pool = pg.Pool;
var pool = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  database: 'mnemonics',
  max: 100, // max number of clients in pool
  idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 second
});

module.exports =  {
  pg : pg,
  
  getConnection: function () {
    return new Promise(function(resolve,reject){
      pool.connect(function(err,client){
        if(err){
          client.release();
          reject(err);
        } 
        else {
          //console.log('established connection');
          resolve(client);
        }
      })
    })
  },
  executeQuery:function (query,params) {
    //console.log(query);
    return this.getConnection().then(function (client) {
      return new Promise(function (resolve, reject) {
        client.query(query,params,function (err, rows) {
          client.release();
          if (err) {
            reject(err);
          } 
          else {
            resolve(rows);
          }
        })
      });
    });
  }
};
