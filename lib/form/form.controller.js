(function () {
    'use strict';

    /**
    *   Form controller
    */

    angular
        .module('app')
        .controller('FormController', FormController);

    FormController.$inject = ['$timeout', '$scope', '$routeParams', 'formService',
        'dataService', 'bindService', 'localStorageService'];

    function FormController($timeout, $scope, $routeParams, formService,
        dataService, bindService, localStorageService) {

        $scope.data = null;
        $scope.structure = null;
        $scope.isShown = false;
        $scope.save = save;
        $scope.clean = clean;

        init($scope);

        function init($scope) {
            var formName = $routeParams.formName;

            if (formName !== undefined) {
                try {
                    bindService.bindFunction($scope, formName);
                } catch(e) {
                    throw e;
                }
            }
        }

        function save() {
            formService.save($scope, $scope.structure);
        }

        function clean() {
            localStorageService.clear($scope);
        }
    }
})();
