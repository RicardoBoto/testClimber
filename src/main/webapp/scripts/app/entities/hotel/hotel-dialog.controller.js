'use strict';

angular.module('testClimberApp').controller('HotelDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Hotel', 'UserTest',
        function($scope, $stateParams, $modalInstance, entity, Hotel, UserTest) {

        $scope.hotel = entity;
        $scope.usertests = UserTest.query();
        $scope.load = function(id) {
            Hotel.get({id : id}, function(result) {
                $scope.hotel = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('testClimberApp:hotelUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.hotel.id != null) {
                Hotel.update($scope.hotel, onSaveSuccess, onSaveError);
            } else {
                Hotel.save($scope.hotel, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
