'use strict';

angular.module('testClimberApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


