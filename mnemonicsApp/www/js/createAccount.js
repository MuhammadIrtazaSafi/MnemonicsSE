/**
 * Created by irtazasafi on 2/21/17.
 */


(function(){


  var createAccount = angular.module('mnemonics.createAccount', ['ngCordova']);


  createAccount.controller('createAccountController', function ($scope, $http,$state) {



    $scope.goBack = function(){
      $state.go('login');
    },

    $scope.createAccount = function(){
      console.log("create acct pressed");
      $http.post("http://localhost:8000/registerUser", {
        username: 'greg',
        password: '123'


      })
        .success(function(response){
          callback(response,false)
          console.log("successful");
          console.log(response);
        })
        .error(function(error){
          callback(false,true)
        });



    }
  });
}());
