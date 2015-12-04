'use strict';

angular.module('testClimberApp')
    .controller('HotelDetailController', function ($scope, $rootScope, $stateParams, entity, Hotel, UserTest) {
        $scope.hotel = entity;
        $scope.load = function (id) {
            Hotel.get({id: id}, function(result) {
                $scope.hotel = result;
            });
        };
        var unsubscribe = $rootScope.$on('testClimberApp:hotelUpdate', function(event, result) {
            $scope.hotel = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
