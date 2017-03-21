/**
 * Created by irtazasafi on 2/21/17.
 */


(function(){


  var mainDeckPage = angular.module('mnemonics.mainDeckPage', ['ngCordova']);


  mainDeckPage.controller('mainDeckPageController', function ($scope, $http,$state,$cordovaGeolocation) {


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
