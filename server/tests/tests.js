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
    it('Should get "x amount" the words from /words', function(done){
        chai.request(server)
            .get('/words')
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.to.have.lengthOf(50);
            })
    });
    it('Should add a nmenonic to a word', function(done){
        chai.request(server)
            .post('/words')
            .end(function(err,res){
                res.should.have.status(200);
            });
    });
    it('Should rate a mnemonic' function(done){
        chai.request(server)
            .post('/rate')
            .res.should.have.status(200);
            //test rating of word
});

describe('Votes', function(){

});
