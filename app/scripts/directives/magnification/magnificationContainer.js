define(['./magnification',
	'./../../services/utils/utils'], function(directives) {
	
	directives.directive('magnificationContainer', function(utils) {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			scope: {
				elementGap : '@',
				elWidth: '@',
				elHeight: '@',
				magnification: '@',
				leftGap: '@',
				rightGap: '@',
				topGap: '@',
				bottomGap: '@',
				layout: '@'
			},
			controller: function($scope) {
				var items = $scope.items = [],
					self = this,
					props = $scope.props = {},
					params = $scope.params = {};

				params.curWidth = params.curHeight = 0;
				props.elementGap = +$scope.elementGap || 10;
				props.elWidth = +$scope.elWidth || 64;
				props.elHeight = +$scope.elHeight || 64;
				props.magnification = +$scope.magnification || 2;
				props.layout = $scope.layout || 'horizontal';
				props.leftGap = +$scope.leftGap || 64;
				props.rightGap = +$scope.rightGap || 64;
				props.topGap = +$scope.topGap || 64;
				props.bottomGap = +$scope.bottomGap || 64;

				curWidth = props.leftGap;
				curHeight = props.topGap;

				switch(props.layout) {
					case 'horizontal':
						params.curHeight = props.elHeight + props.topGap + props.bottomGap;
						params.curWidth = props.rightGap + props.leftGap;
					break;
					case 'vertical':
						params.curWidth = props.elWidth + props.leftGap + props.rightGap;
						params.curHeight = props.topGap + props.bottomGap;
					break;
					default:
						throw new Error('Possible layout prop values are horizontal and vertical.');
				}

				this.addItem = function(item) {
					items.push(item);
					self._initItem(item);

				},

				this._initItem = function(item) {
					item.elWidth = props.elWidth;
					item.elHeight = props.elHeight;
					switch(props.layout) {
						case 'horizontal':
							item.elY = props.topGap;
							item.elX = params.curWidth-props.rightGap;
							params.curWidth	 += (props.elWidth + props.elementGap);
						break;
						case 'vertical':
							item.elY = params.curHeight - props.bottomGap;
							item.elX = props.leftGap;
							params.curHeight += (props.elHeight + props.elementGap);
						break;
					}
				}

			},

			link: function(scope, el, attrs) {
				var self = this,
					parentScope = el.parent().scope(),
					timeout, dataObj;

					function recalculate () {
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

	                    	w += childScope.elWidth + scope.props.elementGap;    
	                    	childScope.recalculate();
						}	
					}

					function restore() {
						scope.items.forEach(function(item) {
							item.elWidth = scope.props.elWidth;
							item.elHeight = scope.props.elHeight;
							item.recalculate();
						});
					}

					el.on('mouseleave', function(){
						if( typeof timeout !== 'undefined' ) {
							clearTimeout(timeout);
							timeout = undefined;
						}
						restore();
					});

					el.on('mousemove', function(evt) {
						var	offset = utils.getComponentOffset(el);
							dataObj = {left: evt.pageX - offset.left , top: evt.pageY - offset.top};
						if( typeof timeout == 'undefined') {
							timeout = setTimeout(function() {
								recalculate();
								timeout = undefined;
								}, 50);
						}
					});

					scope.$on('$destroy', function(){
						el.off('mousemove');
					})
			},
			templateUrl: './views/templates/magnificationContainer.html'
		}
	})
});