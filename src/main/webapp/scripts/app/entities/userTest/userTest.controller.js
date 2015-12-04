'use strict';

angular.module('testClimberApp')
    .controller('UserTestController', function ($scope, $state, $modal, UserTest) {
      
        $scope.userTests = [];
        $scope.loadAll = function() {
            UserTest.query(function(result) {
               $scope.userTests = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.userTest = {
                name: null,
                id: null
            };
        };
    });
