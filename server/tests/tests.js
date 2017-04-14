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

  /*it('Should return 200 from /delete POST', function(done) {
    chai.request(server)
      .post('/delete')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });*/

    it('Should return 200 from /logout POST', function(done) {
        chai.request(server)
            .post('/logout')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });
});

describe('Words', function(){

    it('Should return 200 from /login POST', function(done) {
        chai.request(server)
            .post('/login')
            .send({'username' : 'test', 'password' : 'password'})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    it('Should get all the words from /words', function(done){
        chai.request(server)
            .get('/words')
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.to.have.lengthOf(50);
                done();
            })
    });
    //Specific word from database needs to be added
    it('Should add a mnenonic to a word', function(done){
        chai.request(server)
            .post('/addMnemonic')
            .send({'username' : 'test', 'word' : 'PLACEHOLDER', 'mnenomic' : 'word or phrase to remember word', 'lat' : 0.0, 'long' : 0.0})
            .end(function(err,res){
                res.should.have.status(200);
                done();
            });
    });

    it('Should return all mnemonics created by the user', function(done){
        chai.request(server)
            .post('/getUserMnemonic')
            .end(function(err,res){
                res.should.have.status(200);
                done();
            });
    });

    it('Should return Mnemonics based on location', function(done){
        chai.request(server)
            .get('/locationMnemonic')
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });


describe('Votes', function(){
    //Mnemonic ID needs to be added
    it('Should add upvote to given mnemonic', function(done) {
        chai.request(server)
            .post('/addVote')
            .send({'mn_id' : 'PLACEHOLDER'})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    it('Should add downvote to given mnemonic', function(done) {
        chai.request(server)
            .post('/subtractVote')
            .send({'mn_id' : 'PLACEHOLDER'})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

});
