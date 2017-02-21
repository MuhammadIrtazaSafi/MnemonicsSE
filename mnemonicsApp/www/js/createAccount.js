/**
 * Created by irtazasafi on 2/21/17.
 */


(function(){


  var createAccount = angular.module('mnemonics.createAccount', ['ngCordova']);


  createAccount.controller('createAccountController', function ($scope, $http,$state) {



    $scope.goBack = function(){
      $state.go('login');
    }
  });
}());
