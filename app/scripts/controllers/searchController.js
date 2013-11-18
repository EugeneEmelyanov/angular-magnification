define(['./controllers'], function(controllers) {
	
	controllers.controller('SearchController', function($scope, $http) {

		$scope.searchWord = '';
		$scope.perPage = '';

		$scope.search = function() {
			var q = $scope.searchWord,
				perPage = $scope.perPage,
				url = 'http://graph.facebook.com/' + q;

				$http.get(url).success(function(data) {
			        $scope.images = [data.cover.source];
			   	});
			}

	});

})