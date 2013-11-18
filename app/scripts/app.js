define([
      'angular',
      './controllers/index',
      './directives/index',
      './filters/index',
      './services/index',
      'angular.route',
      'angular.bootstrap',
      'angular.animate'
  ], function (ng) {
      'use strict';
  
     return ng.module('app', [
         'services',
         'controllers',
         'filters',
         'directives',
         'ngRoute',
         'ui.bootstrap',
         'ngAnimate'
     ]);  

 });