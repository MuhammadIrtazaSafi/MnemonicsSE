var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
chai.use(chaiHttp);

describe('Users', function() {
  it('Should reutrn 200 from /test GET', function(done) {
    chai.request(server)
      .get('/test')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('Should return 200 from /registerUser POST', function(done) {
    chai.request(server)
      .post('/registerUser')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });  
});

describe('Words', function(){

});

describe('Votes', function(){

});
