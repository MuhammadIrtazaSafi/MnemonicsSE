/**
 * Created by irtazasafi on 2/21/17.
 */


(function() {

  var login = angular.module('mnemonics.login', ['ngCordova']);


  login.controller('loginController', function ($scope, $http,$state) {





    $scope.login = function(){


      $state.go('mainDeckPage');

      //alert("LOGGING YOU IN");
    }
  });


}());
