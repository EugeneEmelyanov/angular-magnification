define(['./magnification'], function(directives) {
	
	directives.directive('magnificationContainer', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				gap : '=',
				elWidth: '=',
				elHeight: '=',
				magnification: '='
			},
			require: '^magnificationArea',
			controller: function($scope) {
				var items = $scope.items = [],
					self = this,
					props = $scope.props = {},
					params = $scope.params = {};

				params.curWidth = 0;
				props.gap = $scope.gap || 10;
				props.elWidth = $scope.elWidth || 64;
				props.elHeight = $scope.elHeight || 64;
				props.magnification = $scope.magnification || 2;


				this.addItem = function(item) {
					items.push(item);
					self._initItem(item);

				},

				this._initItem = function(item) {
					item.elWidth = props.elWidth;
					item.elHeight = props.elHeight;
					item.elY = 0;
					item.elX = params.curWidth;
					params.curWidth	 += (props.elWidth + props.gap);
				}

			},

			link: function(scope, el, attrs, magAreaContr) {
				var self = this,
					parentScope = el.parent().scope(),
					timeout, dataObj;

					parentScope.$on('mousemoved', function(parScope, evt) {
						dataObj = evt;
						if( typeof timeout == 'undefined') {
							timeout = setTimeout(function() {
								scope.recalculate();
								timeout = undefined;
							}, 50);
						}		
					});

					scope.$watch('params', function() {
						magAreaContr.initialize(scope.params);
					})

					scope.recalculate = function () {
						var len = scope.items.length,
							childScope, dx, dy, d, fx, w,
							maxWidth = scope.props.magnification * scope.props.elWidth,
							maxHeight = scope.props.magnification * scope.props.elHeight,
							minWidth = scope.props.elWidth,
							minHeight = scope.props.elHeight,
							halfHeight = scope.props.elHeight / 2,
							halfWidth = scope.props.elWidth / 2,
							compX = dataObj.left,
							compY = dataObj.top;


					    for (var i = 0; i < len; i++) {
		                    childScope = scope.items[i];
		                    dx = Math.abs(compX - childScope.elX - halfWidth);
		                    dy = Math.abs(compY - childScope.elY - halfHeight);
		                    d = Math.sqrt(dx*dx + dy*dy);
		                    fx = childScope.elWidth / childScope.elHeight;
		                    childScope.elWidth = maxWidth - d/5;
		                    childScope.elHeight = maxHeight - d/5;

		                    if( childScope.elWidth < minWidth ) childScope.elWidth = minWidth;
		                    if( childScope.elWidth > maxWidth ) childScope.elWidth = maxWidth
	                    	if( childScope.elHeight > maxHeight ) childScope.elHeight = maxHeight;
	                    	if( childScope.elHeight < minHeight ) childScope.elHeight = minHeight;

	                    	w += childScope.elWidth + scope.props.gap;    
	                    	childScope.recalculate();
						}	
					}
			},
			templateUrl: './views/templates/magnificationContainer.html'
		}
	})
});