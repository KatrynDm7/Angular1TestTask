(function () {
    'use strict';

    /**
    *   Bind service:
    *       if (localStorage is empty) bind data from json
    *           else from localStorage
    *
    */

    angular
        .module('app')
        .service('bindService', bindService);

    function bindService(formService, dataService,
            utilService, localStorageService) {

        var service = {
            localStorageBind: localStorageBind,
            formBind: formBind,
            bindFunction: bindFunction
        };

        return service;

        function bindFunction($scope, formName) {
            var structureData = formService.getForm($scope, formName)
                .then(function(response) {
                    $scope.structure = response;
                    return response.data;
                })
                .then(function(structure) {
                    var data = dataService.getData($scope, formName);
                    $scope.data = structure;
                    return data;
                })
                .then(function(data) {
                    var localStorage = localStorageService.getLocalStorage(formName);
                    return localStorage;
                })
                .then(function(localStorage) {
                    $scope.localStorage = localStorage;

                    // localStorage is empty
                    if ($scope.localStorage === undefined && $scope.data != null) {
                        formBind($scope.data, $scope.structure);
                    }
                    else {
                        localStorageBind(JSON.parse($scope.localStorage), $scope.structure);
                    }
                })
                .catch(function(e) {
                    throw e;
                });

            return structureData;
        };

        function localStorageBind(data, form) {
            if (form.formName !== undefined) {
                form.fields.forEach(function(item, i) {
                    if (data.fields && data.fields[i] !== undefined) {
                        item.fieldValue = data.fields[i].fieldValue;
                    }
                });
            }
        };

        function formBind(data, form) {
            var dataObject = {};
            var resource = utilService.recursionJSONWalk(data[form.formName], '', dataObject);

            if (form && form.fields !== undefined) {
                form.fields.forEach(function(item, i) {
                    item.fieldValue = resource['' + item.fieldValue];
                });
            }
        };
    }
})();
