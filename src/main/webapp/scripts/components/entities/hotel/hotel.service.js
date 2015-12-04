'use strict';

angular.module('testClimberApp')
    .factory('Hotel', function ($resource, DateUtils) {
        return $resource('api/hotels/:id', {}, {
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
