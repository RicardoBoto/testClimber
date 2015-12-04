'use strict';

describe('UserTest Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockUserTest, MockHotel;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockUserTest = jasmine.createSpy('MockUserTest');
        MockHotel = jasmine.createSpy('MockHotel');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'UserTest': MockUserTest,
            'Hotel': MockHotel
        };
        createController = function() {
            $injector.get('$controller')("UserTestDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'testClimberApp:userTestUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
