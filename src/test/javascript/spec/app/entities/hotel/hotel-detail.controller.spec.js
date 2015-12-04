'use strict';

describe('Hotel Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockHotel, MockUserTest;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockHotel = jasmine.createSpy('MockHotel');
        MockUserTest = jasmine.createSpy('MockUserTest');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Hotel': MockHotel,
            'UserTest': MockUserTest
        };
        createController = function() {
            $injector.get('$controller')("HotelDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'testClimberApp:hotelUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
