'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Kitten = mongoose.model('Kitten'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, kitten;

/**
 * Kitten routes tests
 */
describe('Kitten CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Kitten
		user.save(function() {
			kitten = {
				name: 'Kitten Name'
			};

			done();
		});
	});

	it('should be able to save Kitten instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kitten
				agent.post('/kittens')
					.send(kitten)
					.expect(200)
					.end(function(kittenSaveErr, kittenSaveRes) {
						// Handle Kitten save error
						if (kittenSaveErr) done(kittenSaveErr);

						// Get a list of Kittens
						agent.get('/kittens')
							.end(function(kittensGetErr, kittensGetRes) {
								// Handle Kitten save error
								if (kittensGetErr) done(kittensGetErr);

								// Get Kittens list
								var kittens = kittensGetRes.body;

								// Set assertions
								(kittens[0].user._id).should.equal(userId);
								(kittens[0].name).should.match('Kitten Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Kitten instance if not logged in', function(done) {
		agent.post('/kittens')
			.send(kitten)
			.expect(401)
			.end(function(kittenSaveErr, kittenSaveRes) {
				// Call the assertion callback
				done(kittenSaveErr);
			});
	});

	it('should not be able to save Kitten instance if no name is provided', function(done) {
		// Invalidate name field
		kitten.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kitten
				agent.post('/kittens')
					.send(kitten)
					.expect(400)
					.end(function(kittenSaveErr, kittenSaveRes) {
						// Set message assertion
						(kittenSaveRes.body.message).should.match('Please fill Kitten name');

						// Handle Kitten save error
						done(kittenSaveErr);
					});
			});
	});

	it('should be able to update Kitten instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kitten
				agent.post('/kittens')
					.send(kitten)
					.expect(200)
					.end(function(kittenSaveErr, kittenSaveRes) {
						// Handle Kitten save error
						if (kittenSaveErr) done(kittenSaveErr);

						// Update Kitten name
						kitten.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Kitten
						agent.put('/kittens/' + kittenSaveRes.body._id)
							.send(kitten)
							.expect(200)
							.end(function(kittenUpdateErr, kittenUpdateRes) {
								// Handle Kitten update error
								if (kittenUpdateErr) done(kittenUpdateErr);

								// Set assertions
								(kittenUpdateRes.body._id).should.equal(kittenSaveRes.body._id);
								(kittenUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Kittens if not signed in', function(done) {
		// Create new Kitten model instance
		var kittenObj = new Kitten(kitten);

		// Save the Kitten
		kittenObj.save(function() {
			// Request Kittens
			request(app).get('/kittens')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Kitten if not signed in', function(done) {
		// Create new Kitten model instance
		var kittenObj = new Kitten(kitten);

		// Save the Kitten
		kittenObj.save(function() {
			request(app).get('/kittens/' + kittenObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', kitten.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Kitten instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kitten
				agent.post('/kittens')
					.send(kitten)
					.expect(200)
					.end(function(kittenSaveErr, kittenSaveRes) {
						// Handle Kitten save error
						if (kittenSaveErr) done(kittenSaveErr);

						// Delete existing Kitten
						agent.delete('/kittens/' + kittenSaveRes.body._id)
							.send(kitten)
							.expect(200)
							.end(function(kittenDeleteErr, kittenDeleteRes) {
								// Handle Kitten error error
								if (kittenDeleteErr) done(kittenDeleteErr);

								// Set assertions
								(kittenDeleteRes.body._id).should.equal(kittenSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	/*it('should not be able to delete Kitten instance if not signed in', function(done) {
		// Set Kitten user
		kitten.user = user;

		// Create new Kitten model instance
		var kittenObj = new Kitten(kitten);

		// Save the Kitten
		kittenObj.save(function() {
			// Try deleting Kitten
			request(app).delete('/kittens/' + kittenObj._id)
			.expect(401)
			.end(function(kittenDeleteErr, kittenDeleteRes) {
				// Set message assertion
				(kittenDeleteRes.body.message).should.match('User is not logged in');

				// Handle Kitten error error
				done(kittenDeleteErr);
			});

		});
	});*/

	afterEach(function(done) {
		User.remove().exec();
		Kitten.remove().exec();
		done();
	});
});
