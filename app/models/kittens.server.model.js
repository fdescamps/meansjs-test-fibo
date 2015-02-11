'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Kittens Schema
 */
var KittensSchema = new Schema({
	// Kittens model fields
	name: {
   type: String,
   default: '',
   required: 'Please fill Kitten name',
   trim: true
 },
 created: {
   type: Date,
   default: Date.now
 },
 user: {
   type: Schema.ObjectId,
   ref: 'User'
 },
 kittens: [ { type: Schema.ObjectId, ref: 'Kitten' } ]
});

mongoose.model('Kittens', KittensSchema);
