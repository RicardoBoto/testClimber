'use strict';

angular.module('testClimberApp')
	.controller('UserTestDeleteController', function($scope, $modalInstance, entity, UserTest) {

        $scope.userTest = entity;
        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            UserTest.delete({id: id},
                function () {
                    $modalInstance.close(true);
                });
        };

    });