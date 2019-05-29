(function () {
    angular.module('ocms.signup', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('signup', {
            url: "/signup",
            templateUrl: "/ApiView/components/signup/signupView.html",
            controller: "signupController"
        });
        $stateProvider.state('clickSignup', {
            url: "/login",
            templateUrl: "/ApiView/components/login/loginView.html",
            controller: "loginController",
            params: {
                clickItem: null,
            }
        });
    }
})();