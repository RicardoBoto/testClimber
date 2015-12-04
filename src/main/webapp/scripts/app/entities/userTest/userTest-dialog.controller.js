'use strict';

angular.module('testClimberApp').controller('UserTestDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'UserTest', 'Hotel',
        function($scope, $stateParams, $modalInstance, entity, UserTest, Hotel) {

        $scope.userTest = entity;
        $scope.hotels = Hotel.query();
        $scope.load = function(id) {
            UserTest.get({id : id}, function(result) {
                $scope.userTest = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('testClimberApp:userTestUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.userTest.id != null) {
                UserTest.update($scope.userTest, onSaveSuccess, onSaveError);
            } else {
                UserTest.save($scope.userTest, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
