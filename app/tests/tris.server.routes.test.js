'use strict';

var should = require('should'),
  request = require('supertest'),
  app = require('../../server'),
  mongoose = require('mongoose'),
  Fibonacci = mongoose.model('Fibonacci'),
  agent = request.agent(app);

/**
 * Globals
 */
var credentials;

/**
 * Article routes tests
 */
describe('Tris Controller tests', function() {
  beforeEach(function(done) {
    done();
  });

  it( 'should be able to generate a random array', function( done ) {
    request( app ).get( '/sort/array/random/size/3' )
        .end( function( req, res ) {
          // Set assertion
          res.should.have.length(3);
          // Call the assertion callback
          done();
        });
  });

  /*it( 'should be able to sort by insertion a basic array', function( done ) {
    request( app ).post( '/tri/insertion' )
        .end( function( req, res ) {
          // Set assertion
          res.body.should.be.an.Object.with.property( 'valeur', 0 );
          // Call the assertion callback
          done();
        });
  });*/

  afterEach(function(done) {
    done();
  });
});
