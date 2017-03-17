/**
 * Created by rellg on 2/26/2017.
 */
(function(){

  var settings = angular.module('mnemonics.testScreen', ['ngCordova','mnemonics.comService','ngAnimate']);


  settings.controller('testScreenController', function ($scope, $http, $state, comService) {

    $scope.goBack = function(){
      $state.go('mainDeckPage');
    }

    $scope.knowWord = function(){
      console.log('know word pressed');
      $scope.currentWord = comService.getRandomWord();

    };

    $scope.dontKnowWord = function(){
      console.log('dont know word pressed');
      $scope.currentWord = comService.getRandomWord();

    };

    $scope.voteUp = function(){
      console.log('vote up pressed');

    };

    $scope.voteDown = function(){
      console.log('vote down pressed');

    };

    $scope.mnemonicLeft = function(){
      console.log('mnemonic left pressed');

    };

    $scope.mnemonicRight = function(){
      console.log('mnemonic right pressed');

    };

    $scope.suggestMnemonic = function(){
      $state.go('enterMnemonicForm');
    };

    $scope.currentWord = comService.getRandomWord();


  });
})();
