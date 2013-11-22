define(['./magnification'], function(directives) {
	directives.directive('magnificationItem', function() {

		return {
			restrict: 'E',
			remove: true,
			require: '^magnificationContainer',
			transclude: true,
			replace: true,
			link: function(scope, el, attr, magnificationController) {
				
				magnificationController.addItem(scope);

				scope.scaleStyle = {
						'width': scope.elWidth + 'px', 
						'height': scope.elHeight + 'px', 
						'left': scope.elX + 'px', 
						'top': scope.elY + 'px'
						};

				scope.recalculate = function() {
					scope.$apply(function() {
						var transf = {
						'width': scope.elWidth + 'px', 
						'height': scope.elHeight + 'px', 
						'left': scope.elX + 'px', 
						'top': scope.elY + 'px'
						};
						scope.scaleStyle = transf;
					});
				}

			},
			scope: {
			},
			templateUrl: './views/templates/magnificationItem.html'
		}
	});
})