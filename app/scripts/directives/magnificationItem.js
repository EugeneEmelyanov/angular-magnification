define(['./directives'], function(directives) {
	directives.directive('magnificationItem', function() {

		return {
			restrict: 'E',
			require: '^magnificationContainer',
			transclude: 'true',
			link: function(scope, el, attr, magnificationController) {
				
				magnificationController.addItem(scope);

				// el.on('mouseover', function(evt) {
				// 	magnificationController.scaleUp(scope);
				// });

				// el.on('mouseout', function(evt) {
				// 	magnificationController.scaleDown(scope);
				// });

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