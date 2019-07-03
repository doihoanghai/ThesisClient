/// <reference path="/Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('ocms', 
        [
            'ocms.common',
            'ocms.course',
            'ocms.course_detail',
            'ocms.skill',
            'ocms.category',
            'ocms.category_course',
            'ocms.question',
            'ocms.signup',
            'ocms.edit_profile',
            'ocms.class_detail',
            'ocms.student_class', ,
            'ocms.student_exercise',
            'ocms.do_exercise',
            'ocms.teacher'
        ]
        )
        .config(config)
        .config(configAuthentication);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('base', {
                url: '',
                templateUrl: '/ApiView/shared/views/baseView.html',
                abstract: true,
                controller: "rootController"
            }).state('home', {
                url: "/admin",
                parent: 'base',
                templateUrl: "/ApiView/components/home/homeView.html",
                controller: "rootController"
            }).state('login', {
                url: "/login",
                templateUrl: "/ApiView/components/login/loginView.html",
                controller: "loginController"
            }).state('logout', {
                url: "/logout",
                controller: "logoutController"
            });
        $urlRouterProvider.otherwise('/login');
    }

    function configAuthentication($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $location,$window) {
            return {
                request: function (config) {

                    return config;
                },
                requestError: function (rejection) {

                    return $q.reject(rejection);
                },
                response: function (response) {
                    if (response.status == "401") {
                        $location.path('/login');
                        $window.location.reload(true);

                    }
                    //the same response/modified/or a new one need to be returned.
                    return response;
                }
                //,
                //responseError: function (rejection) {

                //    if (rejection.status == "401") {
                //        $location.path('/login');
                //        $window.location.reload(true);

                //    }
                //    return $q.reject(rejection);
                //}
            };
        });
       
    }
})();