define(['./directives'], function(directives) {

	directives.directive('angular', function() {
		return {
			restrict: 'ECMA',
			link: function(scope, element, attrs) {
				var img = document.createElement('img');
				img.src = 'http://goo.gl/ceZGf';


      // directives as comment
      if (element[0].nodeType === 8) {
      	element.replaceWith(img);
      } else {
      	element[0].appendChild(img);            
      }
  }
}
})

});