(function () {
    angular.module('ocms.chart', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('chart', {
            url: "/chart",
            templateUrl: "/ApiView/components/chart/chartView.html",
            parent: 'base',
            controller: "chartController"
        });
    }
})();