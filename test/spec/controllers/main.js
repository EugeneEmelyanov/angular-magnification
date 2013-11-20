
define(['angular', 
  'angularMocks',
  ''
  ], function (controllers) {
  'use strict';

  describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(angular.module('app'));

  var controllers = angular.module('controllers'),
    MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('myController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
  
});
