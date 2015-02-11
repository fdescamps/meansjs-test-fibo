'use strict';

angular.module('kittens').directive('kittens', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Kittens directive logic
				// ...

				element.text('this is the kittens directive');
			}
		};
	}
]);
