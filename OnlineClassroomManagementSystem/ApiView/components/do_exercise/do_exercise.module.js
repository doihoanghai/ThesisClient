(function () {
    angular.module('ocms.do_exercise', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('do_exercise', {
            url: "/do_exercise/:exerciseID",
            templateUrl: "/ApiView/components/do_exercise/do_exerciseView2.html",
            parent: 'base',
            controller: "do_exerciseController"
        });
    }
})();