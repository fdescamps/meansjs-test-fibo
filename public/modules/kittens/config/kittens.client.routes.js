'use strict';

//Setting up route
angular.module('kittens').config(['$stateProvider',
	function($stateProvider) {
		// Kittens state routing
		$stateProvider.
		state('kittens', {
			url: '/kittens',
			templateUrl: 'modules/kittens/views/kittens.client.view.html'
		}).
		state('listKittens', {
			url: '/kittens',
			templateUrl: 'modules/kittens/views/list-kittens.client.view.html'
		}).
		state('createKitten', {
			url: '/kittens/create',
			templateUrl: 'modules/kittens/views/create-kitten.client.view.html'
		}).
		state('viewKitten', {
			url: '/kittens/:kittenId',
			templateUrl: 'modules/kittens/views/view-kitten.client.view.html'
		}).
		state('editKitten', {
			url: '/kittens/:kittenId/edit',
			templateUrl: 'modules/kittens/views/edit-kitten.client.view.html'
		});
	}
]);
