'use strict';

angular.module('fibonacci').factory('Fibonacci', ['$resource',
	function($resource) {
		return $resource('fibonacci/:argument', {
			argument: 'argument'
		}, {
			compute: {
				method: 'GET'
			}
		});
	}
]);
