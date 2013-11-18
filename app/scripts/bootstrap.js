define([
	'require',
	'angular',
	'scripts/app',
	'scripts/routes'
	], function (require, angular, app, routes) {
		'use strict';

		require(['domReady!'], function (document) {
			angular.bootstrap(document, ['app']);
		});
	});