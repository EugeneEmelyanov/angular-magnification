define(['./filters'], function(filters) {
	'use strict';

	filters.filter('myFilter', function () {
	    return function (input) {
	      return 'myFilter filter: ' + input;
	    };
	  });
	
});

