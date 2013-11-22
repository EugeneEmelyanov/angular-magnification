define(['./magnification',
		'./../../services/utils/utils'], 
		function(directives) {
	
	directives.directive('magnificationArea', function(utils) {
		return {
			transclude: true,
			restrict: 'E',
			replace: true,
			scope:true,
			controller: function($scope) {
			
				params = $scope.params = {};

				this.initialize = function(p) {
					p = angular.extend({ curWidth: 300,
										  curHeight: 300,
										  x: 0,
										  y: 0}, p);
					params = angular.copy(p);
				}

				this.initialize();
			},
			templateUrl: './views/templates/magnificationArea.html',
			link: function(scope, el, attr) {
				el.on('mousemove', function(evt) {
					var	offset = utils.getComponentOffset(el),
						pos = {left: evt.pageX - offset.left , top: evt.pageY - offset.top};
					scope.$broadcast('mousemoved', pos);
				});
			}
		}
	})
});