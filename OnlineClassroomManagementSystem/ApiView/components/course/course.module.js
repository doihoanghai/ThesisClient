(function () {
    angular.module('ocms.course', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('course', {
            url: "/course",
            templateUrl: "/ApiView/components/course/courseView.html",
            parent: 'base',
            controller: "courseController"
        });
        $stateProvider.state('clickCourse', {
            url: "/course_detail/:courseID/:courseName/",
            templateUrl: "/ApiView/components/course_detail/course_detailView.html",
            parent: 'base',
            controller: "course_detailController",
            params: {
                clickItem: null,
            }
        });
    }
})();