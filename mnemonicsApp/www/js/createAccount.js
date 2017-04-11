/**
 * Created by irtazasafi on 2/21/17.
 */


(function(){


  var createAccount = angular.module('mnemonics.createAccount', ['ngCordova','mnemonics.comService']);


  createAccount.controller('createAccountController', function ($scope, $http,$state,comService) {

    $scope.goBack = function(){
      $state.go('login');
    };
    $scope.data = {username:'',password:''};

    $scope.createAccount = function(){
      comService.registerUser($scope.data.username,$scope.data.password, function(rez,err){
        if(err){
          console.log('Error registering user');
        } else {
          console.log('Registered!, please login with your new account');
          $state.go('login');
        }
      });
    }
  });
}());
