(function (app) {
    app.controller('rootController', rootController);

    rootController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService','$window', 'apiService','$location'];

    function rootController($state, authData, loginService, $scope, authenticationService,$window, apiService, $location) {

        $scope.logOut = function () {
            debugger;
            loginService.logOut();
            $location.path('/login').replace();
            window.location.assign('/#/login');
            $window.location.reload(false);

        }
        ;

        $scope.authentication = authData.authenticationData;

        
        //authenticationService.validateRequest();
    }
})(angular.module('ocms'));