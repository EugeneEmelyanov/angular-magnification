define([
      'angular',
      './services/index',
      './controllers/index',
      './filters/index',
      './directives/index',
      './directives/magnification/index',
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
         'magnification',
         'ngRoute',
         'ui.bootstrap',
         'ngAnimate'
     ]);  

 });