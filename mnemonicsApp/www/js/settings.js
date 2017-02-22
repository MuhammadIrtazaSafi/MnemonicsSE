/**
 * Created by irtazasafi on 2/21/17.
 */


(function(){

  var settings = angular.module('mnemonics.settings', ['ngCordova']);


  settings.controller('settingsController', function ($scope, $http,$state) {

    $scope.logout = function(){


    };

    $scope.goBack = function(){
      $state.go('mainDeckPage');
    }


  });
})();
