/**
 * Created by irtazasafi on 2/21/17.
 */


(function() {

  var login = angular.module('mnemonics.login',['ngCordova','mnemonics.comService']);


  login.controller('loginController', function ($scope, $http,$state,comService) {

    $scope.data = {username:'',password:''};
    $scope.login = function(){

      comService.login($scope.data,function(rez,err){
        if(err){
          console.log('Cannot Login. Please check your internet connection')
        } else {
          // save cookie in rez
          console.log('LOGIN SUCCESSFUL');
          comService.getWords();
          comService.pushThenPull();
          $state.go('mainDeckPage');

        }
      });



     // $state.go('mainDeckPage');

      //alert("LOGGING YOU IN");
    }
  });


}());
