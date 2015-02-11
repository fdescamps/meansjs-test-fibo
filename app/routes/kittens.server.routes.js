'use strict';

var users = require('../../app/controllers/users.server.controller'),
		kittens = require('../../app/controllers/kittens.server.controller');

module.exports = function(app) {

	// Kittens Routes
	app.route( '/kittens' )
		.get( kittens.list )
		.post( users.requiresLogin, kittens.create );

	app.route( '/kittens/:kittenId' )
		.get( kittens.read )
		.put( users.requiresLogin, kittens.hasAuthorization, kittens.update )
		.delete( users.requiresLogin, kittens.hasAuthorization, kittens.delete );

	// Finish by binding the kitten middleware
	app.param('kittenId', kittens.kittenByID);
};
