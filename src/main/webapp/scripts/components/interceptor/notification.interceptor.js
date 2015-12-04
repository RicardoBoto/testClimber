 'use strict';

angular.module('testClimberApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-testClimberApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-testClimberApp-params')});
                }
                return response;
            }
        };
    });
