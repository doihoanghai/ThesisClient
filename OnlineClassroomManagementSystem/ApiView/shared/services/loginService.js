(function (app) {
    'use strict';
    app.service('loginService', ['$http', '$q', 'authenticationService', 'authData', 'apiService', '$injector',
    function ($http, $q, authenticationService, authData, apiService, $injector) {
        var userInfo;
        var deferred;

        this.login = function (userName, password) {
            

            deferred = $q.defer();
            var data = "grant_type=password&username=" + userName + "&password=" + password;
            $("#loaderModal").modal();
            document.body.style.cursor = 'wait';
            $http.post(apiService.apihost +'oauth/token', data, {
                headers:
                   { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                var now = new Date();
                ;
                now.setSeconds(now.getSeconds() + response.data.expires_in);
                userInfo = {
                    IsAuthenticated : true,
                    accessToken: response.data.access_token,
                    userName: userName,
                    fullName: decodeURIComponent(escape(response.headers().fullName)),
                    timeToken: now
                };
                debugger;
                authData.authenticationData = userInfo;
                authenticationService.setTokenInfo(userInfo);
                deferred.resolve(null);
                $("#loaderModal").modal('hide');
                document.body.style.cursor = 'auto';
            }, function (err, status) {
                ;

                authData.authenticationData.IsAuthenticated = false;
                authData.authenticationData.userName = "";
                authData.authenticationData.fullName = "";
                authData.authenticationData.timeToken = null;

                deferred.resolve(err);
            })
            return deferred.promise;
        }

      

        this.logOut = function () {
            debugger;
            apiService.get('api/account/logout', null, function (result) {
            },
            function(){
                null
            }
            );            
            authenticationService.removeToken();
        }

    }]);
})(angular.module('ocms.common'));