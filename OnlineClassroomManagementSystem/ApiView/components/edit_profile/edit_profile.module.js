(function () {
    angular.module('ocms.edit_profile', ['ocms.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('edit_profile', {
            url: "/edit_profile",
            templateUrl: "/ApiView/components/edit_profile/edit_profileView.html",
            parent: 'base',
            controller: "edit_profileController"
        });
    }
})();