(function () {
    angular.module('ocms.category', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('category', {
            url: "/category",
            templateUrl: "/ApiView/components/category/categoryView.html",
            parent: 'base',
            controller: "categoryController"
        });
        $stateProvider.state('clickCategory', {
            url: "/category_course/:categoryID/:categoryName/",
            templateUrl: "/ApiView/components/category_course/category_courseView.html",
            parent: 'base',
            controller: "category_courseController",
            params: {
                clickItem: null,
            }
        });
    }
})();