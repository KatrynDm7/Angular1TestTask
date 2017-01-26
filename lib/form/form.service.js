(function () {
    'use strict';

        /**
        *   Form service ($http)
        */

    angular
        .module('app')
        .value('dataDirectoryPath', 'sources/data')
        .value('structureDirectoryPath', 'sources/structure')
        .service('formService', formService);

    function formService($http, dataDirectoryPath, structureDirectoryPath, localStorageService) {
        var service = {
            getForm: getForm,
            save: save
        };

        return service;

        function getForm($scope, formName) {
            return $http.get(structureDirectoryPath + '/' + formName + '.json')
               .then(function(response) {
                    return response.data;
                }).catch(function(e) {
                    throw e;
                });
        }

        function save($scope, form) {
            $http.post(structureDirectoryPath + '/' + form.formName + '.json', form)
                .then(function(response) {
                    // save data to localStorage
                    localStorageService.save($scope, form.formName, angular.toJson(form));
                })
                .catch(function(e) {
                    throw e;
                });
        }
    }
})();
