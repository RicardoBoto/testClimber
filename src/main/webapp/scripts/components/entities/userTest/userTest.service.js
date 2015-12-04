'use strict';

angular.module('testClimberApp')
    .factory('UserTest', function ($resource, DateUtils) {
        return $resource('api/userTests/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
