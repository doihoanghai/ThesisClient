(function (app) {
    app.controller('rootController', rootController);

    rootController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$window', 'apiService', '$location', 'localStorageService'];

    function rootController($state, authData, loginService, $scope, authenticationService, $window, apiService, $location, localStorageService) {
        var checkToken = localStorageService.get("TokenInfo");
        $scope.UserLevel = localStorageService.get("UserLevel");
        if (checkToken) {
            $scope.logOut = function () {
                debugger;
                loginService.logOut();
                $location.path('/login').replace();
                window.location.assign('/#/login');
                $window.location.reload(false);
            }
            $scope.authentication = authData.authenticationData;

            if ($scope.UserLevel == 2) {
                window.location.href = 'http://localhost:2697/#!/student_class'

            }
            if ($scope.UserLevel < 2) {
                window.location.href = 'http://localhost:2697/#!/admin'

            }
        }
        else {
            window.location.href = 'http://localhost:2697/#!/login'
        }


        //authenticationService.validateRequest();
    }
})(angular.module('ocms'));