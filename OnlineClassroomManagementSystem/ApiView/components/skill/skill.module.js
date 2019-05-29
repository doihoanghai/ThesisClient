(function () {
    angular.module('ocms.skill', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('skill', {
            url: "/skill",
            templateUrl: "/ApiView/components/skill/skillView.html",
            parent: 'base',
            controller: "skillController"
        });
    }
})();