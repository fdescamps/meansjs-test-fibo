'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Kitten = mongoose.model('Kitten'),
  _ = require('lodash');
/**
 * Create a Kitten
 */
exports.create = function( req, res ) {
  var kitten = new Kitten( req.body );
  kitten.user = req.user;

  kitten.save( function( err ) {
    if ( err ) {
      return res.status( 400 ).send({
        message: errorHandler.getErrorMessage( err )
      });
    } else {
      res.json( kitten );
    }
  });
};

/**
 * Show the current Kitten
 */
exports.read = function(req, res) {
  res.json( req.kitten );
};

/**
 * Update a Kitten
 */
exports.update = function( req, res ) {
  var kitten = req.kitten;

  kitten = _.extend( kitten, req.body );

  kitten.save( function( err ) {
    if ( err ) {
      return res.status( 400 ).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json( kitten );
    }
  });
};

/**
 * Delete an Kitten
 */
exports.delete = function(req, res) {
  Kitten.find().sort('-created').populate('user', 'displayName').exec( function( err, kittens ) {
    if ( err ) {
      return res.status( 400 ).send({
        message: errorHandler.getErrorMessage( err )
      });
    } else {
      res.json( kittens);
    }
  });
};

/**
 * List of Kittens
 */
exports.list = function( req, res ) {
  Kitten.find().sort('-created').populate('user', 'displayName').exec( function( err, kittens ) {
    if ( err ) {
      return res.status( 400 ).send({
        message: errorHandler.getErrorMessage( err )
      });
    } else {
      res.json( kittens );
    }
  });

  /*Kitten.aggregate(
    { $group: { _id: '$name' } }
  ).exec( function( err, kittens ) {
    if ( err ) {
      return res.status( 400 ).send({
        message: errorHandler.getErrorMessage( err )
      });
    } else {
     res.json( kittens );
   }
 });*/

};


/**
 * Kitten middleware
 */
exports.kittenByID = function( req, res, next, id ) {
  Kitten.findById( id ).populate( 'user', 'displayName' ).exec( function( err, kitten ) {
    if ( err ) return next( err );
    if ( !kitten ) return next(new Error('Failed to load kitten ' + id));
    req.kitten = kitten;
    next();
  });
};

/**
 * Kitten authorization middleware
 */
exports.hasAuthorization = function( req, res, next ) {
  if (req.kitten.user.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};
