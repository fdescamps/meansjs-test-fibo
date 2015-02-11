'use strict';

angular.module('kittens').controller('KittensController', ['$scope', '$stateParams', '$location', 'Authentication', 'Kitten',
	function($scope, $stateParams, $location, Authentication, Kitten) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var kitten = new Kitten({
				name: this.name
			});
			kitten.$save(function(response) {
				$location.path('kittens/' + response._id);

				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(kitten) {
			if (kitten) {
				kitten.$remove();

				for (var i in $scope.kittens) {
					if ($scope.kittens[i] === kitten) {
						$scope.kittens.splice(i, 1);
					}
				}
			} else {
				$scope.kitten.$remove(function() {
					$location.path('kittens');
				});
			}
		};

		$scope.update = function() {
			var kitten = $scope.kitten;

			kitten.$update(function() {
				$location.path('kittens/' + kitten._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.kittens = Kitten.query();
		};

		$scope.findOne = function() {
			$scope.kitten = Kitten.get({
				kittenId: $stateParams.kittenId
			});
		};
	}
]);
