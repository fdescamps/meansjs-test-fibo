'use strict';

/**
 * .
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Fibonacci = mongoose.model('Fibonacci'),
  _ = require('lodash'),
  q = require('q'),
  AsyncProfile = require('async-profile');

/**
 * .
 * Remind : Basic fibonacci function in a recursive mode
 */
function fibonacci( argument ){
  console.log( 'FibonacciController.fibonacci( ' + argument + ' )' );
  if( argument === 0 ){
    return 0;
  }else if( argument === 1 ){
    return 1;
  }else{
    return fibonacci( argument-2 ) + fibonacci( argument-1 );
  }
}

 /**
  * .
  * Build the error and send it to client
  * with the great status and message.
 */
 function sendErrorTo( response ){
   return function( err ){
     console.log( 'FibonacciController.sendErrorTo( response ) : ' + err );
     response.status( 400 ).send({
       message: 'Erreur de traitement : ' + err
     });
   };
 }

 /**
  * .
  * Build the response and send it to client
  * with the great status and message.
  * The message is the result of the fibonacci computation
 */
 function sendResponseTo( response ){
   return function( resultat ){
     console.log( 'FibonacciController.sendResponseTo( response ) : ' + resultat );
     response.status( 200 ).json( resultat );
   };
 }

/**
 *.
 * Have we already did this computation ?
 * Check that in the mongodb, in async,
 * resend with a promise
 */
function hasAnExistingComputation( argument ) {
  return function(){
      var deferred = q.defer();
      console.log( 'FibonacciController.hasAnExistingComputation( ' + argument + ' ) ' );
      Fibonacci.findOne( { argument: argument }, function( erreur, existingResultat ){
          if( erreur ){
            console.log( 'FibonacciController.hasAnExistingComputation() : error : ' + erreur );
            deferred.reject( erreur );
          }else{
            console.log( 'FibonacciController.hasAnExistingComputation( ' + argument + ' ) result is this object: '+ existingResultat );
            deferred.resolve( existingResultat );
            deferred.makeNodeResolver();
          }
        }
      );
      return deferred.promise;
  };
}

/**
 *.
 * Save the new computation in MongoDB
 */
function saveANewComputation( argument ) {
  return function( valeur ){
    var deferred = q.defer();
    console.log( 'FibonacciController.saveANewComputation( ' + argument + ', ' + valeur + ' ) ' );

    new Fibonacci( { argument: argument, valeur: valeur } ).save( function( error, result ){
      if ( error ){
        console.log( 'FibonacciController.saveANewComputation( ' + argument + ', ' + valeur + ' ) error : ' + error );
        //throw error;
      } else {
        console.log( 'FibonacciController.saveANewComputation( ' + argument + ', ' + valeur + ' ) result : ' + result );
        deferred.makeNodeResolver();
      }
    });

    deferred.resolve( valeur );
    return deferred.promise;
  };
}

/**
 * .
 * Compute sub fibonacci computation
 */
function computeASubFibonacci( argument ) {
  console.log( 'FibonacciController.computeASubFibonacci( ' + argument + ' ) ' );
  var deferred = q.defer();
  q()
    .then( hasAnExistingComputation( argument ) )
    .then( function( existingResultat ){

      if( undefined === existingResultat || null === existingResultat ){

        console.log( 'FibonacciController.computeASubFibonacci.innerFunction( ' + argument + ' = unknown value )' );
        q()
          .then( computeFibonacci( argument ) )
          .then( function( result ){
            deferred.resolve( result );
          });

      }else{

        console.log( 'FibonacciController.computeASubFibonacci.innerFunction( ' + existingResultat.argument + ' = ' + existingResultat.valeur + ' )' );
        q( existingResultat )
          .then( function( result ){
            deferred.resolve( result );
          });

      }
    });
  return deferred.promise;
}

/**
 *.
 * Build the answer for the client
 * JS Object with argument/value attributes
 */
function buildTheAnswer( argument ){
  return function( existingResultat ){
    var deferred = q.defer();
    console.log( 'FibonacciController.buildTheAnswer( existingResultat ) with argument: ' + argument +'; and value: ' + existingResultat );
    deferred.resolve(
      {
        argument: argument,
        valeur: existingResultat
      }
    );
    return deferred.promise;
  };
}

/**
 * .
 * The sequence of promises and computation
 * in order to do the computation
 * with the already computed fibonacci
 */
function computeFibonacci( argument ) {
  return function(){
    var deferred = q.defer();
    console.log( 'FibonacciController.computeFibonacci( ' + argument + ' ) ' );
    q()
      .then( hasAnExistingComputation( argument ) )
      .then(
        function( existingResultat ){
          console.log( 'FibonacciController.computeFibonacci.innerFunction( ' + existingResultat + ' ) ' );
          if( 0 === argument ){

            q( 0 )
              .then( saveANewComputation( 0, 0 ) )
              .then( buildTheAnswer( 0 ) )
              .then( function( result ){
                deferred.resolve( result );
              });

          }else if( 1 === argument ){

            q( 1 )
              .then( saveANewComputation( 1, 1 ) )
              .then( buildTheAnswer( 1 ) )
              .then( function( result ){
                deferred.resolve( result );
              });

          }else if( undefined === existingResultat || null === existingResultat ){

            // unknown fibonacci computation
            // we have to compute ourselves
            // but we have to use the already computed fibonacci
            // by asking mongodb
            q()
              .then( function(){
                var promises = [];
                promises.push( computeASubFibonacci( argument-2 ) );
                promises.push( computeASubFibonacci( argument-1 ) );
                promises.reduce( function ( fiboN2, fiboN1 ) {
                  return q.when( fiboN2, function ( fiboN2 ) {
                    return q.when( fiboN1, function ( fiboN1 ) {
                      console.log( 'fiboN2: ' + fiboN2.valeur +', fiboN1: '+ fiboN1.valeur + ', fiboN2+fiboN1= ' + (fiboN2.valeur + fiboN1.valeur) );
                      return fiboN2.valeur + fiboN1.valeur;
                    });
                  });
                })
                .then( saveANewComputation( argument ) )
                .then( buildTheAnswer( argument ) )
                .then( function( result ){
                  deferred.resolve( result );
                });
              })
              .catch( function( err ){
                deferred.reject( 'error while saving our new value : ' + err );
              })
              .finally( function(){
                console.log( 'FibonacciController.computeFibonacci( '+argument+' ).finally()' );
              });

          }else{

            q( existingResultat.valeur )
              .then( buildTheAnswer( argument ) )
              .then( function( result ){
                deferred.resolve( result );
              });

          }
        }
      )
      .catch( function( err ){
        deferred.reject('FibonacciController.computeFibonacci.catch : error while computing fibonacci result : ' + err);
      })
      .finally( function(){
        console.log( 'FibonacciController.computeFibonacci.finally( )' );
      });
    return deferred.promise;
  };
}

/***
 *.
 * PUBLIC METHODS
 */

/**
 * .
 * Compute the fibonacci suite for the argument in parameter.
 * We use promise concept with Q library because of
 * the mongodb storage use so we have async methods.
 * Yes, we use memoization algorithm we use in order
 * to save CPU cycle.
 */
exports.computeWithMemoization = function( argument ) {

  /*return AsyncProfile.profile( function () {
    // doStuff
    return setTimeout( function () {

    });
  });*/

  return computeFibonacci( argument );

};


/**
 * .
 * Compute the traditionnal fibonacci suite for the argument in parameter.
 * Recursive way
 */
exports.computeWithoutMemoization = function( argument ) {

  return function(){

    var deferred = q.defer();

    q( fibonacci( argument ) )
      .then( buildTheAnswer( argument ) )
      .then( function( result ){
        deferred.resolve( result );
    });

    return deferred.promise;

  };

};
