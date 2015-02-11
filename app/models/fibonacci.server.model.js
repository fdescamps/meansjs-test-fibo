'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Fibonacci Schema
 */
var FibonacciSchema = new Schema({
  argument: {
    type: String, 
    unique: true,
    required: 'Argument cannot be blank'
  },
  valeur: {
    type: Number,
    default: -1
  }
});

mongoose.model('Fibonacci', FibonacciSchema);
