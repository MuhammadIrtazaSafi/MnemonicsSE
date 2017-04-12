/**
 * Created by rellg on 2/27/2017.
 */

(function(){

  var settings = angular.module('mnemonics.enterMnemonicForm', ['ngCordova']);


  settings.controller('enterMnemonicFormController', function ($scope, $http, $state, comService, $rootScope) {

    $scope.goBack = function(){
      $state.go('testScreen');
    };

    $scope.submit = function(newMnemonicText){
      //handle text entry
      //console.log('Submit Pressed for word_id: '+ comService.getCurrentWordID());

      if(newMnemonicText)
        comService.addMnemonic(newMnemonicText, function(){
          comService.pushThenPull();
        });

      //$rootScope.$broadcast('ts');
      $state.go('testScreen');
    };

  });
})();
