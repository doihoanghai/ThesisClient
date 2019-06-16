(function () {
    angular.module('ocms.student_exercise', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('student_exercise', {
            url: "/student_exercise/:classID/:courseID/",
            templateUrl: "/ApiView/components/student_exercise/student_exerciseView.html",
            parent: 'base',
            controller: "student_exerciseController"
        });
       
    }
})();