/**
 * Created by rellg on 2/26/2017.
 */
(function(){

  var settings = angular.module('mnemonics.testScreen', ['ngCordova']);


  settings.controller('testScreenController', function ($scope, $http,$state) {

    $scope.goBack = function(){
      $state.go('mainDeckPage');
    }

    $scope.knowWord = function(){

    };

    $scope.dontKnowWord = function(){

    };

    $scope.voteUp = function(){

    };

    $scope.voteDown = function(){

    };

    $scope.swipeLeft = function(){

    };

    $scope.swipeRight = function(){

    };

  });
})();
