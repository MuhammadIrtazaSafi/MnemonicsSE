/**
 * Created by irtazasafi on 2/21/17.
 */



var routingModule = angular.module('mnemonics.routes',[]);

routingModule.config(function($stateProvider,$urlRouterProvider) {


  $stateProvider.state('login', {
    url: '/login',
    templateUrl:'templates/login.html',
    controller:'loginController'
  });


  $stateProvider.state('createAccount',{
    url:'/createAccount',
    templateUrl:'templates/createAccount.html',
    controller:'createAccountController'
  });


  $stateProvider.state('mainDeckPage',{
    url:'/mainDeckPage',
    templateUrl:'templates/mainDeckPage.html',
    controller:'mainDeckPageController'
  });


  $stateProvider.state('settings',{
    url:'/settings',
    templateUrl:'templates/settings.html',
    controller:'settingsController'
  });

  $urlRouterProvider.otherwise('/login');

});
