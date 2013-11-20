define(['./directives'], function(directives) {
	
	directives.directive('magnificationArea', function() {
		return {
			transclude: true,
			restrict: 'E',
			replace: true,
			scope:true,
			controller: function($scope) {
				$scope.getComponentOffset = function(elm) { 
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
					};
				params = $scope.params = {};
				this.initialize = function(p) {
					params.curWidth = p.curWidth || 300;
					params.curHeight = p.curHeight || 300;
					params.x = p.x || 0;
					params.y = p.y || 0;
				}
			},
			templateUrl: './views/templates/magnificationArea.html',
			link: function(scope, el, attr) {
				el.on('mousemove', function(evt) {
					var	offset = scope.getComponentOffset(el),
						pos = {left: evt.pageX - offset.left , top: evt.pageY - offset.top};
					scope.$broadcast('mousemoved', pos);
				});
			}
		}
	})
});