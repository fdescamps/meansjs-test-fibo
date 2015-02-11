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
describe('Fibonacci CRUD tests', function() {
  beforeEach(function(done) {
    Fibonacci.remove({});
    done();
  });

  it( '/fibonacci => 404', function( done ) {
    request( app ).get( '/fibonacci' )
        .expect( 404 )
        .end( function( err, res ) {
          // Set message assertion
          // Handle article save error
          done(err);
        });
  });

  it( '/fibonacci/ => 404', function( done ) {
    request( app ).get( '/fibonacci/' )
        .expect( 404 )
        .end( function( err, res ) {
          // Set message assertion
          // Handle article save error
          done(err);
        });
  });

  it( 'should be able to compute a basic fibonacci : f(0)', function( done ) {
    request( app ).get( '/fibonacci/0' )
        .end( function( req, res ) {
          // Set assertion
          res.body.should.be.an.Object.with.property( 'valeur', 0 );
          // Call the assertion callback
          done();
        });
  });

  it( 'should be able to compute a basic fibonacci : f(1)', function( done ) {
    request( app ).get( '/fibonacci/1' )
        .end( function( req, res ) {
          // Set assertion
          res.body.should.be.an.Object.with.property( 'valeur', 1 );
          // Call the assertion callback
          done();
        });
  });

  it( 'should be able to compute a basic fibonacci : f(2)', function( done ) {
    request( app ).get( '/fibonacci/2' )
        .end( function( req, res ) {
          // Set assertion
          res.body.should.be.an.Object.with.property( 'valeur', 1 );
          // Call the assertion callback
          done();
        });
  });

  it( 'should be able to compute a basic fibonacci : f(3)', function( done ) {
    request( app ).get( '/fibonacci/3' )
        .end( function( req, res ) {
          // Set assertion
          res.body.should.be.an.Object.with.property( 'valeur', 2 );
          // Call the assertion callback
          done();
        });
  });

  it( 'should be able to compute a basic fibonacci : f(4)', function( done ) {
    request( app ).get( '/fibonacci/4' )
        .end( function( req, res ) {
          // Set assertion
          res.body.should.be.an.Object.with.property( 'valeur', 3 );
          // Call the assertion callback
          done();
        });
  });

  it( 'should be able to compute a basic fibonacci : f(5)', function( done ) {
    request( app ).get( '/fibonacci/5' )
        .end( function( req, res ) {
          // Set assertion
          res.body.should.be.an.Object.with.property( 'valeur', 5 );
          // Call the assertion callback
          done();
        });
  });

  it( 'should be able to compute a basic fibonacci : f(10)', function( done ) {
    request( app ).get( '/fibonacci/10' )
        .end( function( req, res ) {
          // Set assertion
          res.body.should.be.an.Object.with.property( 'valeur', 55 );
          // Call the assertion callback
          done();
        });
  });

  it( 'should be able to compute a basic fibonacci : f(15)', function( done ) {
    request( app ).get( '/fibonacci/15' )
        .end( function( req, res ) {
          // Set assertion
          res.body.should.be.an.Object.with.property( 'valeur', 610 );
          // Call the assertion callback
          done();
        });
  });

  it( 'should thrown an exception : f(xxxx)', function( done ) {
    request( app ).get( '/fibonacci/xxxx' )
        .expect( 400 )
        .end( function( err, res ) {
          // Set message assertion
          (res.body.message).should.match( 'Argument invalide!' );

          // Handle article save error
          done(err);
        });
  });

  it( 'should thrown an exception : f(-5)', function( done ) {
    request( app ).get( '/fibonacci/-5' )
        .expect( 400 )
        .end( function( err, res ) {
          // Set message assertion
          (res.body.message).should.match( 'Argument (<0) invalide!' );

          // Handle article save error
          done(err);
        });
  });

  it( 'should be able to compute a basic fibonacci : f(1)', function( done ) {
    request( app ).get( '/fibonacci/withoutmemoization/1' )
        .end( function( req, res ) {
          // Set assertion
          res.body.should.be.an.Object.with.property( 'valeur', 1 );
          // Call the assertion callback
          done();
        });
  });

  it( 'should be able to compute a basic fibonacci : f(5)', function( done ) {
    request( app ).get( '/fibonacci/withoutmemoization/5' )
        .end( function( req, res ) {
          // Set assertion
          res.body.should.be.an.Object.with.property( 'valeur', 5 );
          // Call the assertion callback
          done();
        });
  });

  it( 'should thrown an exception : f(xxxx)', function( done ) {
    request( app ).get( '/fibonacci/withoutmemoization/xxxx' )
        .expect( 400 )
        .end( function( err, res ) {
          // Set message assertion
          (res.body.message).should.match( 'Argument invalide!' );

          // Handle article save error
          done(err);
        });
  });

  it( 'should thrown an exception : f(-5)', function( done ) {
    request( app ).get( '/fibonacci/withoutmemoization/-5' )
        .expect( 400 )
        .end( function( err, res ) {
          // Set message assertion
          (res.body.message).should.match( 'Argument (<0) invalide!' );

          // Handle article save error
          done(err);
        });
  });

  it( '/fibonacci => 404', function( done ) {
    request( app ).get( '/fibonacci/withoutmemoization' )
        .expect( 400 )
        .end( function( err, res ) {
          // Set message assertion
          // Handle article save error
          done(err);
        });
  });

  it( '/fibonacci/ => 404', function( done ) {
    request( app ).get( '/fibonacci/withoutmemoization/' )
        .expect( 400 )
        .end( function( err, res ) {
          // Set message assertion
          // Handle article save error
          done(err);
        });
  });

  afterEach(function(done) {
    Fibonacci.remove({});
    done();
  });
});
