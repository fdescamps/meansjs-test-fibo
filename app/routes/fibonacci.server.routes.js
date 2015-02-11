'use strict';

var fibonacci = require('../../app/controllers/fibonacci.server.controller');

module.exports = function(app) {

	app.route('/fibonacci/:argument')
		.get(fibonacci.computeWithMemoization);

	app.route('/fibonacci/withoutmemoization/:argument')
		.get(fibonacci.computeWithoutMemoization);

};
