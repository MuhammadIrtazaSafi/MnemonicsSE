/**
 * Created by irtazasafi on 2/21/17.
 */


(function(){

  var comService = angular.module('mnemonics.comService',[]);
  var wordArray =[
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
  ];
  var mnArrayObject =  function(){
    return {mnemonics:[]};
  };
  var mnWordArray = [new mnArrayObject()];
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
  for(var i=0;i<wordArray.length;i++) {
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
  }
  var mnemonicIndex=0;
  var currentWordID=0;




  comService.factory('comService',function($rootScope,$http){
    var factoryObj = {};

    // REST REQUESTS TO THE SERVER 


    factoryObj.login = function(data,callback){
      console.log("logging in " + data.username + " " + data.password);
      $http.post("http://localhost:8000/login",{username:data.username,password:data.password})
        .success(function(response){
          console.log(response);
          callback(response,false)
        })
        .error(function(error){
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
      $http.get("http://localhost:8000/words", {params:{}})
        .success(function (response) {
          callback(response, false);
        })
        .error(function (error) {
          callback(false, true)
        });
    };
    factoryObj.addMnemonic = function(data,callback) {
      $http.post("http://localhost:8000/mnemonic", {params:data}) // to be posted
        .success(function (response) {
          callback(response, false);
        })
        .error(function (error) {
          callback(false, true)
        });
    };
    factoryObj.upVoteMnemonic = function(id, callback){
      $http.post("http://localhost:8000/upvote",{id:id})
        .success(function(response){
          callback(response,false);
        })
        .error(function(error){
          callback(false,error);
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

    factoryObj.logout = function(callback){
      $http.post("http://localhost:8000/logout", {username: username, password: password})
        .success(function (response) {
          callback(response, false);
        })
        .error(function (error) {
          callback(false, true)
        });
    };


    /// HAVEN'T TOUCHED THESE METHODS. PLEASE CHANGE AS APPROPRIATE ///

    factoryObj.generateRandomNumber = function(min,max){
      return Math.floor(((Math.random() * (max-min))+min));
    };

    factoryObj.getRandomWord = function(){
      var randomNum=factoryObj.generateRandomNumber(1,wordArray.length);
      var word = wordArray[randomNum];
      currentWordID = word.word_id;
      return word;
    };

    factoryObj.getMnemonic = function(word_id,index){
      //console.log("getMnemonic called with word ID: "+word_id+" and index: "+index);
      return mnWordArray[word_id].mnemonics[index];
    };

    factoryObj.getFirstMnemonic = function(word_id){
      mnemonicIndex=0;
      return factoryObj.getMnemonic(word_id,mnemonicIndex);
    };

    factoryObj.getNextMnemonic = function(word_id){
      if(mnWordArray[word_id].mnemonics[mnemonicIndex+1])
        mnemonicIndex++;
      return factoryObj.getMnemonic(word_id,mnemonicIndex);
    };

    factoryObj.getPrevMnemonic = function(word_id){
      if(mnWordArray[word_id].mnemonics[mnemonicIndex-1])
        mnemonicIndex--;
      return factoryObj.getMnemonic(word_id,mnemonicIndex);
    };

    factoryObj.setCurrentWordID = function(word_id){
      currentWordID=word_id;
    };

    factoryObj.getCurrentWordID = function(){
      return currentWordID;
    };

    factoryObj.sendNewMnemonic = function(newMnemonicText){
      console.log('New mnemonic received of '+newMnemonicText+" for word id:"+ currentWordID);
    };

    factoryObj.upVoteMnemonic = function(upVotedMnemonic){
      console.log('upvote of '+upVotedMnemonic.mnemonic+" for word id:"+ currentWordID);
    };

    factoryObj.downVoteMnemonic = function(downVotedMnemonic){
      console.log('downvote of '+downVotedMnemonic.mnemonic+" for word id:"+ currentWordID);
    };

    return factoryObj;
  })

}());
