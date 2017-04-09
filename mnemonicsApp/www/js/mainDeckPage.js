/**
 * Created by irtazasafi on 2/21/17.
 */


(function(){


  var mainDeckPage = angular.module('mnemonics.mainDeckPage', ['ngCordova','mnemonics.comService']);


  mainDeckPage.controller('mainDeckPageController', function ($scope, $http,$state,$cordovaGeolocation,comService) {


    $scope.deckClicked = function(){
      comService.getWords(function(err,rez) {
        if(err){
          alert('Could not connect to server')
        } else {
          // recieve deck of words here
        }


      });

    };

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;

        console.log(lat);
        console.log(long);
      }, function(err) {
        // error
      });


  });


}());
