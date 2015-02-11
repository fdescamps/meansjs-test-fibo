'use strict';

// Kittens module config
angular.module('kittens').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Kittens', 'kittens', 'dropdown', '/kittens(/create)?');
		Menus.addSubMenuItem('topbar', 'kittens', 'List Kittens', 'kittens');
		Menus.addSubMenuItem('topbar', 'kittens', 'New Kitten', 'kittens/create');
	}
]);
