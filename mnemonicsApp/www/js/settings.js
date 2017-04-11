/**
 * Created by irtazasafi on 2/21/17.
 */


(function(){

  var settings = angular.module('mnemonics.settings', ['ngCordova','mnemonics.comService']);


  settings.controller('settingsController', function ($scope, $http,$state,comService) {

    $scope.logout = function(){
      comService.logout($scope.data,function(rez,err){
        if(err){
          alert('Could not logout');
        } else {
          console.log('Logged out');
          $state.go('login');
        }
      })
    };

    $scope.goBack = function(){
      $state.go('mainDeckPage');
    }


  });
})();
