'use strict';

angular.module('testClimberApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('userTest', {
                parent: 'entity',
                url: '/userTests',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'testClimberApp.userTest.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userTest/userTests.html',
                        controller: 'UserTestController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userTest');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('userTest.detail', {
                parent: 'entity',
                url: '/userTest/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'testClimberApp.userTest.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/userTest/userTest-detail.html',
                        controller: 'UserTestDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('userTest');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'UserTest', function($stateParams, UserTest) {
                        return UserTest.get({id : $stateParams.id});
                    }]
                }
            })
            .state('userTest.new', {
                parent: 'userTest',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/userTest/userTest-dialog.html',
                        controller: 'UserTestDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('userTest', null, { reload: true });
                    }, function() {
                        $state.go('userTest');
                    })
                }]
            })
            .state('userTest.edit', {
                parent: 'userTest',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/userTest/userTest-dialog.html',
                        controller: 'UserTestDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['UserTest', function(UserTest) {
                                return UserTest.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userTest', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('userTest.delete', {
                parent: 'userTest',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/userTest/userTest-delete-dialog.html',
                        controller: 'UserTestDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['UserTest', function(UserTest) {
                                return UserTest.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('userTest', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
