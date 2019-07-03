(function (app) {
    app.controller('logoutController', ['$http', '$q', '$scope', 'loginService', '$injector', 'notificationService', '$location', 'apiService', 'authData', '$window', 'authenticationService', 'localStorageService',
        function ($http, $q, $scope, loginService, $injector, notificationService, $location, apiService, authData, $window, authenticationService, localStorageService) {
            


            localStorageService.set("UserLevel", null);
            localStorageService.set("TokenInfo", null);
            window.location.href = 'http://localhost:2697/#!/login'
                //apiService.post('logout', null, function (result) {
                //    alert("Đăng xuất");

                //}, function (erro) {
                //    alert('Lỗi postAPI');
                //});

                //logoutService.logout($scope.logoutData.userName, $scope.logoutData.password).then(function (response) {
                //    if (response != null && response.data.error != undefined) {
                //        notificationService.displayError("Đăng nhập không đúng.");
                //    }
                //    else {
                //        var stateService = $injector.get('$state');
                //        var leveluser;

                //        var config = {
                //            params: {
                //                password: $scope.logoutData.password
                //            }
                //        }
                //        var url = 'api/account/detail/' + $scope.logoutData.userName;
                //        apiService.get(url, config, function (response) {

                //            authData.authenticationData.fullName = response.data.FullName;
                //            authData.authenticationData.leveluser = response.data.UserLevel;
                //            authData.authenticationData.userName = response.data.UserName;
                //            leveluser = response.data.UserLevel;

                //            authenticationService.setTokenInfo(authData.authenticationData);

                //            apiService.get('api/applicationUser/getListMenu?userName=' + $scope.logoutData.userName + "&passWord=" + $scope.logoutData.password, null, function (menu) {


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
        }]);
})(angular.module('ocms'));