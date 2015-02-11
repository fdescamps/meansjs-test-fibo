'use strict';

//Kittens service used to communicate Kittens REST endpoints
angular.module('kittens').factory('Kitten', ['$resource',
	function($resource) {
		return $resource('kittens/:kittenId', { kittenId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
