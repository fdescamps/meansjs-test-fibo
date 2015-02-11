'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
  Kitten = mongoose.model('Kitten'),
	Kittens = mongoose.model('Kittens');

/**
 * Globals
 */
var user, kittens, asterix, obelix, idefix;

/**
 * Unit tests
 */
describe('Kittens Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {

      asterix = new Kitten({
        name: 'Astérix',
        user: user
      });
      asterix.save();

      obelix = new Kitten({
        name: 'Obélix',
        user: user
      });
      obelix.save();

      idefix = new Kitten({
        name: 'Idéfix',
        user: user
      });

      idefix.save();

			kittens = new Kittens({
        name: 'Gaulloise Family',
        user: user,
        kittens: [ asterix, obelix, kittens ]
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return kittens.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		Kittens.remove().exec();
		User.remove().exec();

		done();
	});
});
