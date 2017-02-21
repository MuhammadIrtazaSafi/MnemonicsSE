var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
chai.use(chaiHttp);

describe('Users', function() {
  it('Should return 200 from /registerUser POST', function(done) {
    chai.request(server)
      .post('/registerUser')
      .send({'username' : 'test', 'password' : 'password', 'f_name' : 'tester', 'l_name' : 'tester'})
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  
  it('Should return 200 from /login POST', function(done) {
    chai.request(server)
      .post('/login')
      .send({'username' : 'test', 'password' : 'password'})
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
