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
  fibonacci = require('./fibonacci.server.services');

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
 * .
 * Compute the fibonacci suite for the argument in parameter.
 * We use promise concept with Q library because of
 * the mongodb storage use so we have async methods.
 * Yes, we use memoization algorithm we use in order
 * to save CPU cycles.
 */
exports.computeWithMemoization = function( req, res ) {

  if( undefined!==req.params.argument && ''!==req.params.argument.trim() && !isNaN( req.params.argument ) ){

     var argument = parseInt( req.params.argument );

     if( argument >= 0 ){

       var sendError = sendErrorTo( res );
       var sendIt = sendResponseTo( res );

       return q()
       .then( fibonacci.computeWithMemoization( argument ) )
       .then( sendIt )
       .catch( sendError )
       .finally(function(){
         console.log('FibonacciController.compute().finally() : response sent for argument: ', argument);
       });

     }else{

       return res.status( 400 ).send({
         message: 'Argument (<0) invalide!'
       });

     }

   }else{

     return res.status( 400 ).send({
       message: 'Argument invalide!'
     });

   }

};

/**
 * .
 * Compute the fibonacci suite for the argument in parameter.
 * We use promise concept with Q library because of
 * the mongodb storage use so we have async methods.
 * Yes, we use memoization algorithm we use in order
 * to save CPU cycles.
 */
exports.computeWithoutMemoization = function( req, res ) {

  if( undefined!==req.params.argument && ''!==req.params.argument.trim() && !isNaN( req.params.argument ) ){

    var argument = parseInt( req.params.argument );

    if( argument >= 0 ){

      console.log( 'FibonacciController.computeWithoutMemoization(' + argument + ')' );

      var sendError = sendErrorTo( res );
      var sendIt = sendResponseTo( res );

      return q()
      .then( fibonacci.computeWithoutMemoization( argument ) )
      .then( sendIt )
      .catch( sendError )
      .finally(function(){
        console.log('FibonacciController.compute().finally() : response sent for argument: ', argument);
      });

    }else{

      return res.status( 400 ).send({
        message: 'Argument (<0) invalide!'
      });

    }

  }else{

    return res.status( 400 ).send({
      message: 'Argument invalide!'
    });

  }

};

/**
 * Create a Fibonacci
 */
exports.create = function(req, res) {

};

/**
 * Show the current Fibonacci
 */
exports.read = function(req, res) {

};

/**
 * Update a Fibonacci
 */
exports.update = function(req, res) {

};

/**
 * Delete an Fibonacci
 */
exports.delete = function(req, res) {

};

/**
 * List of Fibonaccis
 */
exports.list = function(req, res) {

};
