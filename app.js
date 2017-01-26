(function () {
    'use strict';

    angular
        .module('app', ['ngRoute'])
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/404', {
                templateUrl: 'views/404.html'
            })
            .when('/:formName', {
                templateUrl: 'lib/form/form.html',
                controller: 'FormController',
                controllerAs: 'form'
            })
            .otherwise({ redirectTo: '/' });
        }
})();
