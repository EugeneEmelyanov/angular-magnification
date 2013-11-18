define(['./directives'], function(directives) {
	
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
			controller: function($scope) {
				var items = $scope.items = [],
					self = this,
					props = $scope.props = {};

				$scope.curWidth = 0;
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
					item.elY = $scope.curWidth;
					item.elX = 0;
					$scope.curWidth	 += (props.elWidth + props.gap);
				}
			},

			link: function(scope, el, attrs) {
				var self = this;
				self.offset = function(elm) { 
						  try {return elm.offset();} catch(e) {} 
						  var rawDom = elm[0]; 
						  var _x = 0; 
						  var _y = 0; 
						  var body = document.documentElement || document.body; 
						  var scrollX = window.pageXOffset || body.scrollLeft; 
						  var scrollY = window.pageYOffset || body.scrollTop; 
						  _x = rawDom.getBoundingClientRect().left + scrollX; 
						  _y = rawDom.getBoundingClientRect().top + scrollY; 
						  return { left: _x, top:_y }; 
					}

					angular.element(window).on('mousemove', function(evt) {
						var len = scope.items.length,
							childScope, dx, dy, d, fx, w,
							maxWidth = scope.props.magnification * scope.props.elWidth,
							maxHeight = scope.props.magnification * scope.props.elHeight,
							minWidth = scope.props.elWidth,
							minHeight = scope.props.elHeight,
							offset = self.offset(el),
							compX = Math.abs(offset.left - evt.screenX),
							compY = Math.abs(offset.top - evt.screenY);


					    for (var i = 0; i < len; i++) {
		                    childScope = scope.items[i];
		                    dx = Math.abs(compX - childScope.elX);
		                    dy = Math.abs(compY - childScope.elY);
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
                	});
			},
			templateUrl: './views/templates/magnificationContainer.html'
		}
	})
});