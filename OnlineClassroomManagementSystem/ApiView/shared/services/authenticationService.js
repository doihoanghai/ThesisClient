(function (app) {
    'use strict';
    app.service('authenticationService', ['$http', '$q', '$window', 'localStorageService', 'authData', '$filter',
    function ($http, $q, $window, localStorageService, authData, $filter) {
        var tokenInfo = {};

       this.setTokenInfo = function (data) {
           tokenInfo = data;
           authData.authenticationData.accessToken = tokenInfo;
            localStorageService.set("TokenInfo", tokenInfo);
        }

        this.getTokenInfo = function () {
            return tokenInfo;
        }

        this.removeToken = function () {
            debugger;
            tokenInfo = null;
            localStorageService.set("TokenInfo", null);
            localStorageService.set("TempData", null);
            localStorageService.set("listMenu", null);


        }

        this.init = function () {
            var tokenInfo = localStorageService.get("TokenInfo");
            if (tokenInfo) {
                
                authData.authenticationData.accessToken = tokenInfo;
                
            }
        }

        this.setHeader = function () {
            delete $http.defaults.headers.common['X-Requested-With'];
             
            if ((authData.authenticationData != undefined) || (authData.authenticationData.accessToken != undefined) || (authData.authenticationData.accessToken != null) || (authData.authenticationData.accessToken != "")) {
                $http.defaults.headers.common['Authorization'] = 'JWT ' + authData.authenticationData.accessToken;
                $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            }
            else {
                $http.defaults.headers.common['Authorization'] = null;
                $http.defaults.headers.common['Content-Type'] = null;
            }
        }

        this.validateRequest = function () {
            var url = 'api/home/TestMethod';
            var deferred = $q.defer();
            $http.get(url).then(function () {
                deferred.resolve(null);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        this.init();
    }
    ]);
})(angular.module('ocms.common'));