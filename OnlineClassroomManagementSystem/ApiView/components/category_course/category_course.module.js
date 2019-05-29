(function () {
    angular.module('ocms.category_course', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('category_course', {
            url: "/category_course/:categoryID",
            templateUrl: "/ApiView/components/category_course/category_courseView.html",
            parent: 'base',
            controller: "category_courseController"
        });
    }
})();