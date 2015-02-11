'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Kitten Schema
 */
var KittenSchema = new Schema({
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
	}
});

mongoose.model('Kitten', KittenSchema);
