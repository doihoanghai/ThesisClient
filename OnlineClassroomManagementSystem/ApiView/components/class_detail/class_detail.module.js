(function () {
    angular.module('ocms.class_detail', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('class_detail', {
            url: "/class_detail/:classID/:className/",
            templateUrl: "/ApiView/components/class_detail/class_detailView.html",
            parent: 'base',
            controller: "class_detailController",
            params: {
                clickItem: null,
            }
        });
    }
})();