'use strict';

angular.module('fibonacci').controller('FibonacciController', ['$scope', '$stateParams', '$location', 'Authentication', 'Fibonacci',
	function($scope, $stateParams, $location, Authentication, Fibonacci) {
		$scope.authentication = Authentication;

		$scope.compute = function() {
			$scope.fibonacci = Fibonacci.get({
				argument: $stateParams.argument
			});
		};
	}
]);
