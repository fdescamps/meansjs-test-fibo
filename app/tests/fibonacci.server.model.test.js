'use strict';

/**
* Module dependencies.
*/
var should = require('should'),
mongoose = require('mongoose'),
Fibonacci = mongoose.model('Fibonacci');

var db = mongoose.connection;

db.on( 'error',
  console.error.bind( console, 'connection error:' )
);

db.once( 'open', function (callback) {
  // yay!
  //console.log( '---> open connection' );
});

/**
* Globals
*/
var fibonaccin25, fibonaccin24;

/**
* Unit tests
*/
describe('Fibonacci Model Unit Tests:', function() {

  beforeEach(function(done) {

    fibonaccin25 = new Fibonacci({
      argument: '25',
      valeur: 75025
    });
    fibonaccin24 = new Fibonacci({
      argument: '24',
      valeur: 46368
    });

    Fibonacci.remove();

    fibonaccin25.save();

    done();

  });

  describe('Method Save', function() {
    it('should not be able to save it agains', function(done) {
      return new Fibonacci({
        argument: '25',
        valeur: 75025
      }).save( function( err ) {
        should.exist( err );
        done();
      });
    });

    it('should be able to show an error when try to save without argument', function(done) {
      fibonaccin24.argument = null;
      return fibonaccin24.save( function( err ) {
        should.exist( err );
        done();
      });
    });
  });

  describe('Method Find', function() {
    it('should be able to find without problems', function( done ) {
      return Fibonacci.find( { argument: fibonaccin25.argument }, function( err, data ) {
        //console.log( '-----------------------> ' + data + ', ' + data[0].argument + ', ' + data[0].valeur );
        should.exist( data );
        data[0].should.be.an.Object;
        data[0].should.have.properties( ['_id', 'argument', '__v', 'valeur'] );
        data[0].should.have.property( 'argument', fibonaccin25.argument );
        data[0].should.have.property( 'valeur', fibonaccin25.valeur );
        data[0].should.have.properties({
          argument: fibonaccin25.argument,
          valeur: fibonaccin25.valeur
        });
        //data[0].should.have.ownProperty( 'argument' ).equal( fibonaccin25.argument );
        //data[0].should.have.ownProperty( 'valeur' ).equal( fibonaccin25.valeur );
        data[0].should.be.an.instanceOf(Object).and.have.property( 'argument', fibonaccin25.argument );
        ( data[0].argument ).should.equal( fibonaccin25.argument );
        ( data[0].valeur ).should.equal( fibonaccin25.valeur );
        ( data[0].argument).should.be.exactly( fibonaccin25.argument ).and.be.a.String;
        ( data[0].valeur ).should.be.exactly( fibonaccin25.valeur ).and.be.a.Number;
        // compare object structure : ( data[0] ).should.eql( fibonaccin25 );
        data[0].should.be.an.Object.with.property( 'valeur', fibonaccin25.valeur );
        done();
      });

    });

    it('should be able to show an error when try to save without argument', function(done) {
      return Fibonacci.find( { argument: fibonaccin24.argument }, function( err, data ) {
        data.should.have.length(0);
        done();
      });
    });

  });

  afterEach(function(done) {
    Fibonacci.remove().exec();
    done();
  });

});
