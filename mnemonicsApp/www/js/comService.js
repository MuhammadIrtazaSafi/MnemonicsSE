/**
 * Created by irtazasafi on 2/21/17.
 */


(function(){

  var comService = angular.module('mnemonics.comService',[]);
  var wordArray=[];
    /*=
    [ //this is test data. Leave it in
    {word_id:0, word:"Worm", def:"animal that lives underground"},
    {word_id:1, word:"Apple", def:"A tasty fruit"},
    {word_id:2, word:"Carrot", def:"A vegetable"},
    {word_id:3, word:"Potato", def:"A vegetable from root"},
    {word_id:4, word:"Basil", def:"A herb to add flavor to main dishes"},
    {word_id:5, word:"Pear", def:"A gross weird fruit with bad texture"},
    {word_id:6, word:"Cherry", def:"A sweet fruit with a pit"},
    {word_id:7, word:"Onion", def:"A strong tasting vegetable from the ground"},
    {word_id:8, word:"BMW", def:"Type of vehicle manufactured in Germany"},
    {word_id:9, word:"Mitsubishi", def:"Vehicle manufacturer"},
    {word_id:10, word:"Canada", def:"A cold country in North America"},
    {word_id:11, word:"Mexico", def:"A warm country in North America"},
    {word_id:12, word:"Hot Pockets", def:"A type of pizza filled snack considered junk food"},
    {word_id:13, word:"PapaJohns", def:"A pizza store"},
    {word_id:14, word:"Japan", def:"A country in the continent of Asia"},
    {word_id:15, word:"Mortgage", def:"A type of robbery by the banking system to enslave you in debt for life"},
    {word_id:16, word:"Sod", def:"Strips of grass within a dirt root layer"},
    {word_id:17, word:"Chicken Wings", def:"A deep fried food that tastes delicious"},
    {word_id:18, word:"Baseball", def:"A sport played with a bat, glove, and ball"}
  ];*/


  var mnArrayObject =  function(){
    return {mnemonics:[]};
  };
  var mnWordArray = [];
  var manualEntry = [
    ["Slimy", "Catch Fish"],
    ["It can be red, green, whatever", "fell on Newton's head", "Sometimes has worms in it", "pretty good in the morning"],
    ["Long and orange with a point", "goes well in stew", "feed it to reindeer", "thin sliced with chicken wings and blue cheese"],
    ["the base for any stew","chips","fries","Irish people"],
    ["Italian seasoning", "gives wicked heartburn", "pesto"],
    ["looks funny","wide at bottom and skinny at top","horrible texture"],
    ["on top"],
    ["Multiple layers","used in most dishes"],
    ["Rich dudes","rich dude wannabees"],
    ["makes good bikes","Japanese company that makes a lot of stuff"],
    ["America's Hat","Free health care", "no Trump land"],
    ["America's Beard","Build the wall"],
    ["Programmers fav food","pizza goo stuff in fake pastery","guaranteed to give you cancer"],
    ["Probably the best pizza joint in Orlando","F Pizza Hut","the wings kinda suck"],
    ["Conichiwa"],
    ["A tool to enslave you in debt for life","make a developer's salary and this won't be a big deal","Baby boomers ruined it"],
    ["Expensive lawn that already is grown","gotta water it nonstop"],
    ["Probably the only food I'll eat when I'm old and dying","Buffalo, Honey garlic, BBQ","bone in or out"],
    ["America's passtime","boring as F","Cubs are current champs (world series)"],
    []
  ];


  /*for(var i=0;i<wordArray.length;i++) {
    if (!mnWordArray[i]) {
      mnWordArray.push(new mnArrayObject());
    }
    for(var j=0;j<manualEntry[i].length;j++){
      mnWordArray[i].mnemonics.push(
        {mn_id:j,
          word_id:i,
          user_id:0,
          mnemonic:manualEntry[i][j],
          lat:0,
          long:0,
          rating:0})
    }
  }*/


  var userMnemonicSet=[];
  var locationMnemonicSet=[];
  var mnemonicSet=[];

  var mnemonicIndex=0;
  var currentWordID=0;
  var username="";
  var respObj;




  comService.factory('comService',function($rootScope,$http,$cordovaGeolocation){
    var factoryObj = {};

    // REST REQUESTS TO THE SERVER


    factoryObj.login = function(data,callback){
      username=data.username;
      console.log("logging in " + data.username + " " + data.password);
      $http.post("http://localhost:8000/login",{username:data.username,password:data.password})
        .success(function(response){
          console.log("successful login");
          factoryObj.setSID(response);
          console.dir(response);
          callback(response,false);
        })
        .error(function(error){
          console.log("error logging in...");
          callback(false,true)
        });

    };
    factoryObj.registerUser = function(username,password,callback) {
      $http.post("http://localhost:8000/registerUser", {username: username, password: password})
        .success(function (response) {
          callback(response, false);
        })
        .error(function (error) {
          callback(false, true)
        });
    };
    factoryObj.getWords = function(callback) {
      $http.get("http://localhost:8000/words", {params:{sid:factoryObj.getSID()}})
        .success(function (response) {
          //callback(response, false);
          wordArray=response;
          console.log('words received from server');
        })
        .error(function (error) {
          //callback(false, true)
          console.log('error getting words');
        });
    };
    factoryObj.addMnemonic = function(data,callback) {
      var lat,long;
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
           lat  = position.coords.latitude;
           long = position.coords.longitude;

          console.log(lat);
          console.log(long);
          $http.post("http://localhost:8000/mnemonic", {word_id:currentWordID, mnemonic:data, lat:lat, long:long, username:username}) // to be posted     x = "INSERT INTO mnemonics (user_id, word_id, mnemonic, lat, long, rating) VALUES ("+q+",'"+req.body.word_id+"','"+ req.body.mnemonic+"','"+ req.body.lat+"','"+ req.body.long+"',0)";
            .success(function (response) {
              callback(response, false);
            })
            .error(function (error) {
              callback(false, true)
            });


        }, function(err) {
          // error
        });



    };


    factoryObj.downVoteMnemonic = function(id, callback){
      $http.post("http://localhost:8000/downvote",{id:id})
        .success(function(response){
          callback(response,false);
        })
        .error(function(error){
          callback(false,error);
        });
    };

    factoryObj.logout = function(data,callback){
      $http.post("http://localhost:8000/logout", {username:this.data.username,password:this.data.password})
        .success(function (response) {
          callback(response, false);
        })
        .error(function (error) {
          callback(false, true)
        });
    };

    factoryObj.setSID = function(obj){
      this.respObj=obj;
      console.log('stored SID: '+factoryObj.getSID());
    };

    factoryObj.getSID = function(){
      return this.respObj.cookie.sid;
    };


    /// HAVEN'T TOUCHED THESE METHODS. PLEASE CHANGE AS APPROPRIATE ///

    factoryObj.generateRandomNumber = function(min,max){
      return Math.floor(((Math.random() * (max-min))+min));
    };

    factoryObj.getRandomWord = function(){
      try {
        var randomNum = factoryObj.generateRandomNumber(1, wordArray.length);
        var word = wordArray[randomNum];
        currentWordID = word.word_id;
        return word;
      }
      catch(e){
        console.log('word array not populated');
      }
    };


    factoryObj.getLocalMnemonicSet = function() {
      $http.get("http://localhost:8000/locationMnemonics", {params: {lat: 28, long: -81}})
        .success(function (response) {
          //callback(response,false);
          locationMnemonicSet=response;
        })
        .error(function (error) {
          //callback(false,error);
          console.log("error getting location mnemonics from server");
        });
    };


      factoryObj.getUserMnemonicSet = function() {
        $http.get("http://localhost:8000/userMnemonic", {params:{username: username, word_id:679}})
          .success(function (response) {
            //callback(response,false);
            userMnemonicSet=response;
          })
          .error(function (error) {
            //callback(false,error);
            console.log("error getting user mnemonics from server");
          });
      };

      factoryObj.mergeMnemonicSets = function(){
          console.log('combining sets');
          var mnemonicArray=[];
          var mnIDs=[];
          for(var i=0;i<userMnemonicSet.length;i++){
            tempMn=userMnemonicSet[i];
            var newMnemonic = {
              word_id:tempMn.word_id,
              mn_id:tempMn.mn_id,
              mnemonic:tempMn.mnemonic,
              rating:tempMn.rating
            };
            mnemonicArray.push(newMnemonic);
            mnIDs.push(newMnemonic.mn_id);
          }
          for(i=0;i<locationMnemonicSet.length;i++){
            tempMn=locationMnemonicSet[i];
            var newMnemonic = {
              word_id:tempMn.word_id,
              mn_id:tempMn.mn_id,
              mnemonic:tempMn.mnemonic,
              rating:tempMn.rating
            };
            if(mnIDs.indexOf(newMnemonic.mn_id)<0){
              mnemonicArray.push(newMnemonic);
            }
          }
          //set the global array
          mnemonicSet=mnemonicArray;
        };

      factoryObj.parseWordMnemonics = function(){
        var wordMnemonics=[];
        for(i=0;i<mnemonicSet.length;i++){
          if(mnemonicSet[i].word_id==currentWordID){
            wordMnemonics.push(mnemonicSet[i]);
          }
        }
        mnWordArray=wordMnemonics;
      };

      factoryObj.pushThenPull = function () { //automate the process
        factoryObj.getLocalMnemonicSet();
        factoryObj.getUserMnemonicSet();
        setTimeout(function() {
          factoryObj.mergeMnemonicSets();
          factoryObj.parseWordMnemonics();
        },200);
        $rootScope.$emit('ts');
      };

    factoryObj.getMnemonic = function(word_id,index){
      try{
        return mnWordArray[index];
      }
      catch (e){
        console.log("getMnemonic called with index value of "+index+" and error thrown");
      }
    };

    factoryObj.getFirstMnemonic = function(word_id){
      mnemonicIndex=0;
      factoryObj.parseWordMnemonics();
      return factoryObj.getMnemonic(word_id,mnemonicIndex);
    };

    factoryObj.getNextMnemonic = function(word_id){
      try {
        if (mnWordArray[mnemonicIndex + 1])
          mnemonicIndex++;
        return factoryObj.getMnemonic(word_id, mnemonicIndex);
      }
      catch (e){console.log('error getting next mnemonic');}
    };

    factoryObj.getPrevMnemonic = function(word_id){
      try {
        if (mnWordArray[mnemonicIndex - 1])
          mnemonicIndex--;
        return factoryObj.getMnemonic(word_id, mnemonicIndex);
      }
      catch (e){console.log('error getting previous mnemonic');}
    };










    factoryObj.upVoteMnemonic = function(upVotedMnemonic){
      try {
        console.log('upvote of ' + upVotedMnemonic.mn_id + " for word id:" + currentWordID);
        $http.post("http://localhost:8000/upvote",{mn_id:upVotedMnemonic.mn_id})
          .success(function(response){
            //callback(response,false);
          })
          .error(function(error){
            console.log('server did not accept upvote');
            //callback(false,error);
          });
      }
      catch (e){console.log('error upvoting mnemonic');}
    };

    factoryObj.downVoteMnemonic = function(downVotedMnemonic){
      try {
        console.log('downvote of ' + downVotedMnemonic.mn_id + " for word id:" + currentWordID);
        $http.post("http://localhost:8000/downvote",{mn_id:downVotedMnemonic.mn_id})
          .success(function(response){
            //callback(response,false);
          })
          .error(function(error){
            //callback(false,error);
            console.log('server did not accept down vote');
          });
      }
      catch (e){console.log('error downvoting mnemonic');}
    };

    return factoryObj;
  })

}());
