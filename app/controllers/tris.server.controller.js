'use strict';

/**
 * .
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  _ = require('lodash'),
  q = require('q');

/**
 * .
 * Generates a random array of numbers
 */
exports.generateArray = function( req, res ) {

    if( undefined!==req.params.size && ''!==req.params.size.trim() && !isNaN( req.params.size ) ){

      var size = parseInt( req.params.size );

      if( size >= 0 ){

        var generatedArray = [];
        for( var i = 0; i < size; i++ ){
          generatedArray[i] = Math.floor( ( Math.random() * 1000 ) + 1 );
        }
        return res.json( generatedArray );

      } else {

        return res.status( 400 ).send({
          message: 'Taille (<0) invalide!'
        });

      }

    } else {

      return res.status( 400 ).send({
        message: 'Argument invalide!'
      });

    }

};

/**
 * .
 *
 */
exports.insertion = function( req, res ) {

  if( undefined!==req.body.numbers && req.body.numbers.length>=0 ){

    var resultat = [];
    var numbers = req.body.numbers;
    var numbersAsJSon = JSON.parse( numbers );

    /*var test = new Array( numbers );
    var test = test.sort(function(a, b){return a-b});
    console.log( '--------> new Array( numbers ).sort() :' + test );*/

    console.log( '--------> numbersAsJSon : ' + numbersAsJSon );
    var i, j;
    for (i = 1; i < numbersAsJSon.length; ++i) {
      var elem = numbersAsJSon[i];
      for (j = i; j > 0 && numbersAsJSon[j-1] > elem; j--){
        numbersAsJSon[j] = numbersAsJSon[j-1];
      }
      numbersAsJSon[j] = elem;
    }
    console.log( '--------> numbersAsJSon sorted : ' + numbersAsJSon );

    return res.json( numbersAsJSon );

  } else {

    return res.status( 400 ).send({
      message: 'Argument invalide!'
    });

  }

};

/*
procédure tri_insertion(tableau T, entier n)
      pour i de 1 à n-1
          x ← T[i]
          j ← i
          tant que j > 0 et T[j - 1] > x
              T[j] ← T[j - 1]
              j ← j - 1
          fin tant que
          T[j] ← x
     fin pour
  fin procédure
*/
