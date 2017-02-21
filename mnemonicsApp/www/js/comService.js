/**
 * Created by irtazasafi on 2/21/17.
 */




(function(){

  var comService = angular.module('mnemonics.comService',[]);


  comService.factory('comService',function($rootScope,$http){

    var factoryObj = {};


    factoryObj.login = function(data){

      $http.get("http://localhost:3000/login",{params:data})
        .success(function(response){



        })
        .error(function(error){



        });


    };


    return factoryObj;
  })

}());
