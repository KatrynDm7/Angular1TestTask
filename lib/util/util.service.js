(function () {
    'use strict';

    /**
    * Service for util functions
    */

    angular
        .module('app')
        .service('utilService', utilService);

    function utilService() {
        var service = {
            recursionJSONWalk: recursionJSONWalk
        };

        return service;

        /**
        *  Method for recursion walk of stored json data file
        */
        function recursionJSONWalk(object, txt, dataArray) {
            for (var key in object) {
                if (typeof object[key] == 'object') {
                    this.recursionJSONWalk(object[key], (txt ? txt + '.' : '') + key, dataArray);
                }
                else {
                    dataArray[(txt ? (txt + '.') : '') + key] = object[key];
                }
            }
            return dataArray;
        };
    }
})();
