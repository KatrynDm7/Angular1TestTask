(function () {
    'use strict';

    /**
    * localStorage service
    */

    angular
        .module('app')
        .value('MSG_CLEAN', 'localStorage was cleaned')
        .value('MSG_SAVE', 'localStorage was saved')
        .service('localStorageService', localStorageService);

    function localStorageService(MSG_CLEAN, MSG_SAVE, $timeout) {
        var service = {
            save: save,
            clear: clear,
            getLocalStorage: getLocalStorage,
            getNotification: getNotification
        };

        return service;

        function save($scope, key, value) {
            localStorage.setItem(key, value);
            getNotification($timeout, $scope, MSG_SAVE);
        }

        function clear($scope) {
            localStorage.clear();
            getNotification($timeout, $scope, MSG_CLEAN);
        }

        function getLocalStorage(name) {
            var storage;

            if (localStorage.getItem(name) != null) {
                storage = localStorage.getItem(name);
            }

            return storage;
        }
    }

    function getNotification($timeout, $scope, txt) {
        $scope.localstorage_msg = txt;

        $timeout(function() {
            $scope.localstorage_msg = '';
        }, 1500);
    }
})();
