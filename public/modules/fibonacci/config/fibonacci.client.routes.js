'use strict';

//Setting up route
angular.module('fibonacci').config(['$stateProvider',
	function($stateProvider) {
		// Fibonacci state routing
		$stateProvider.
		state('fibonacci', {
			url: '/fibonacci/:argument',
			templateUrl: 'modules/fibonacci/views/fibonacci.client.view.html'
		});
	}
]);
