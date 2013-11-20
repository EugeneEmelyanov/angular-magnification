require.config({
    baseUrl:'base/app/',
    paths: {
        angular: 'bower_components/angular/angular',
        angularResource: 'bower_components/angular-resource/angular-resource',
        domReady: 'bower_components/requirejs-domready/domReady',
        'angular.route': 'bower_components/angular-route/angular-route',
        'angular.ui': 'bower_components/angular-ui/build/angular-ui',
        'angular.bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular.animate': 'bower_components/angular-animate/angular-animate',
        'angularMocks': 'bower_components/angular-mocks/angular-mocks'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular.route': ['angular'],
        'angular.ui': ['angular'],
        'angular.bootstrap' : ['angular'],
        'angular.animate' : ['angular'],
         angularResource: { deps:['angular']},
         angularMocks: { deps:['angularResource']}
    }
});

require(
    [
        'domReady',
        'scripts/bootstrap',
        '../test/test-tests',
        '../test/spec/directives/myDirective'
    ],
    function(domReady) {
        domReady(function() {
            window.__karma__.start();
        })
    });