(function (app) {
    app.controller('loginController', ['$http', '$q', '$scope', 'loginService', '$injector', 'notificationService', '$location', 'apiService', 'authData', '$window', 'authenticationService', 'localStorageService',
        function ($http, $q, $scope, loginService, $injector, notificationService, $location, apiService, authData, $window, authenticationService, localStorageService) {

            $scope.loginData = {
                UserName: "",
                Password: ""
            };


            $scope.loginSubmit = function () {

                apiService.post('login', $scope.loginData, function (result) {
                    if (result.data.token != undefined)  {
                        authenticationService.setTokenInfo(result.data.token);
                        window.location.href = 'http://localhost:2697/#!/admin'
                    }
                    else {
                        alert(result.data.message);
                    }
                }, function (erro) {
                    alert('Lỗi postAPI');
                    });

                //loginService.login($scope.loginData.userName, $scope.loginData.password).then(function (response) {
                //    if (response != null && response.data.error != undefined) {
                //        notificationService.displayError("Đăng nhập không đúng.");
                //    }
                //    else {
                //        var stateService = $injector.get('$state');
                //        var leveluser;

                //        var config = {
                //            params: {
                //                password: $scope.loginData.password
                //            }
                //        }
                //        var url = 'api/account/detail/' + $scope.loginData.userName;
                //        apiService.get(url, config, function (response) {

                //            authData.authenticationData.fullName = response.data.FullName;
                //            authData.authenticationData.leveluser = response.data.UserLevel;
                //            authData.authenticationData.userName = response.data.UserName;
                //            leveluser = response.data.UserLevel;

                //            authenticationService.setTokenInfo(authData.authenticationData);

                //            apiService.get('api/applicationUser/getListMenu?userName=' + $scope.loginData.userName + "&passWord=" + $scope.loginData.password, null, function (menu) {


                //                var listMenu = menu.data;

                //                localStorageService.set("listMenu", JSON.stringify(listMenu));

                //                if (leveluser < 6) {
                //                    $location.path('/admin');
                //                }
                //                else
                //                    $location.path('/patient');
                //            });


                //        });
                //    }

                //});
            }
        }]);
})(angular.module('ocms'));