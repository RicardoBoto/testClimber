'use strict';

angular.module('testClimberApp')
    .controller('UserTestDetailController', function ($scope, $rootScope, $stateParams, entity, UserTest, Hotel) {
        $scope.userTest = entity;
        $scope.load = function (id) {
            UserTest.get({id: id}, function(result) {
                $scope.userTest = result;
            });
        };
        var unsubscribe = $rootScope.$on('testClimberApp:userTestUpdate', function(event, result) {
            $scope.userTest = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
