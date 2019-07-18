(function () {
    angular.module('ocms.chart_detail', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('chart_detail', {
            url: "/chart_detail",
            templateUrl: "/ApiView/components/chart_detail/chart_detailView.html",
            parent: 'base',
            controller: "chart_detailController"
        });
    }
})();