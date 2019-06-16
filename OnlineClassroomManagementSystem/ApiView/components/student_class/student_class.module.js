(function () {
    angular.module('ocms.student_class', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('student_class', {
            url: "/student_class",
            templateUrl: "/ApiView/components/student_class/student_classView.html",
            parent: 'base',
            controller: "student_classController"
        });
        $stateProvider.state('clickClassStudent', {
            url: "/student_exercise/:classID/:courseID/",
            templateUrl: "/ApiView/components/student_exercise/student_exerciseView.html",
            parent: 'base',
            controller: "student_exerciseController",
            params: {
                clickItem: null,
            }
        });
    }
})();