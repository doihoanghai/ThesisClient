(function () {
    angular.module('ocms.question', ['ocms.common'])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('question', {
            url: "/question/:exerciseID",
            templateUrl: "/ApiView/components/question/questionView.html",
            parent: 'base',
            controller: "questionController"
        });
    }
})();