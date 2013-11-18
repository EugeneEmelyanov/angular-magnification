define(['./app'], function (app) {
	'use strict';
	return app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/main', {
			templateUrl: 'views/main.html',
			controller: 'myController'
		});

		$routeProvider.otherwise({
			redirectTo: '/main'
		});
	}]);
});