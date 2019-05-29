(function () {
    angular.module('ocms.course_detail', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('course_detail', {
            url: "/course_detail/:courseID",
            templateUrl: "/ApiView/components/course_detail/course_detailView.html",
            parent: 'base',
            controller: "course_detailController"
        });

        $stateProvider.state('clickClass', {
            url: "/class_detail/:classID/:className/",
            templateUrl: "/ApiView/components/class_detail/class_detailView.html",
            parent: 'base',
            controller: "class_detailController",
            params: {
                clickItem: null,
            }
        });
        $stateProvider.state('clickExercise', {
            url: "/question/:exerciseID",
            templateUrl: "/ApiView/components/question/questionView.html",
            parent: 'base',
            controller: "questionController"
        });
    }
})();