(function () {
    angular.module('ocms.teacher', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('teacher', {
            url: "/teacher",
            templateUrl: "/ApiView/components/teacher/teacherView.html",
            parent: 'base',
            controller: "teacherController"
        });
    }
})();