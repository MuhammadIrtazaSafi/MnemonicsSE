/**
 * Created by rellg on 2/27/2017.
 */

(function(){

  var settings = angular.module('mnemonics.enterMnemonicForm', ['ngCordova']);


  settings.controller('enterMnemonicFormController', function ($scope, $http,$state) {

    $scope.goBack = function(){
      $state.go('testScreen');
    }

    $scope.submit = function(){
      //handle text entry
      $state.go('testScreen');
    };

  });
})();
