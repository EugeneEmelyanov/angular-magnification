// the app/scripts/main.js file, which defines our RequireJS config
require.config({
	paths: {
		angular: 'bower_components/angular/angular',
		angularResource: 'bower_components/angular-resource/angular-resource',
		domReady: 'bower_components/requirejs-domready/domReady',
		'angular.route': 'bower_components/angular-route/angular-route',
		'angular.ui': 'bower_components/angular-ui/build/angular-ui',
		'angular.bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
		'angular.animate': 'bower_components/angular-animate/angular-animate'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		'angular.route': ['angular'],
		'angular.ui': ['angular'],
		'angular.bootstrap' : ['angular'],
		'angular.animate' : ['angular']
	},
	deps: ['/scripts/bootstrap.js']

});
