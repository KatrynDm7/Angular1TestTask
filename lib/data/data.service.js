(function () {
    'use strict';

    /**
    *   service for data (*.json)
    */

    angular
        .module('app')
        .value('dataDirectoryPath', 'sources/data')
        .service('dataService', dataService);

    function dataService($http, dataDirectoryPath) {
        var service = {
            getData: getData
        };

        return service;

        function getData($scope, formName) {
            return $http.get(dataDirectoryPath + '/' + formName + '.json')
                .then(function(response) {
                    $scope.data = response.data;
                    return response.data;
                }).catch(function(e) {
                    throw e;
                });
        }
    }
})();
