/**
 * Created by irtazasafi on 2/21/17.
 */


(function(){

  var comService = angular.module('mnemonics.comService',[]);

  var wordArray =[
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


  comService.factory('comService',function($rootScope,$http){

    var factoryObj = {};


    factoryObj.login = function(data){

      $http.get("http://localhost:3000/login",{params:data})
        .success(function(response){



        })
        .error(function(error){



        });


    };

    factoryObj.generateRandomNumber = function(min,max){
      return Math.floor(((Math.random() * (max-min))+min));
    };

    factoryObj.getRandomWord = function(){
      var randomNum=factoryObj.generateRandomNumber(1,wordArray.length);
      return wordArray[randomNum];
    };


    return factoryObj;
  })

}());
