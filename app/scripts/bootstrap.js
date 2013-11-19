define([
	'require',
	'angular',
	'scripts/app',
	'scripts/routes'
	], function (require, angular, app, routes) {
		'use strict';

		require(['domReady!'], function (document) {
			angular.bootstrap(document, ['app']);

			var html = document.getElementsByTagName('html')[0];

			html.setAttribute('ng-app', 'app');
			html.dataset.ngApp = 'app';

			if (top !== window) {
			    top.postMessage({
			        type: 'loadamd'
			    }, '*');
			}

		});
	});