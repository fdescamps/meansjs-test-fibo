'use strict';

angular.module('kittens').filter('kittens', [
	function() {
		return function(input) {
			// Kittens directive logic
			// ...

			return 'kittens filter: ' + input;
		};
	}
]);
