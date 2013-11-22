define(['./../../directives/magnification/magnification'],function(magnification) {
	magnification.factory('utils', function() {
		return {
			getComponentOffset: function(elm) {
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
		};
	});
});