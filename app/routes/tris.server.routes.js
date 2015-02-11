'use strict';

var triController = require( '../../app/controllers/tris.server.controller' );

module.exports = function( app ) {

  app.route( '/sort/array/random/size/:size' )
    .get( triController.generateArray );

  app.route( '/sort/insertion' )
    .post( triController.insertion );

};
