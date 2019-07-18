(function () {
    angular.module('ocms.teacher_exercise', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('teacher_exercise', {
            url: "/teacher_exercise/:exerciseData",
            templateUrl: "/ApiView/components/teacher_exercise/teacher_exerciseView.html",
            parent: 'base',
            controller: "teacher_exerciseController",
            params: {
                exerciseID: null,
            }
        });
    }
})();