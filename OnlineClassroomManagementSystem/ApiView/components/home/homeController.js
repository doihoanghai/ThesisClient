(function (app) {
    app.controller('homeController', homeController);

    homeController.$inject = ['authData','$scope', 'authenticationService','localStorageService'];
    debugger;
    

    function homeController(authData, $scope, authenticationService,localStorageService) {
        debugger;
        authenticationService.init();
        $scope.authentication = authData.authenticationData;
        $scope.listMenu = [];
       

        function getMenu() {
            var term = localStorageService.get("listMenu");
            $scope.listMenu = JSON.parse(term);
        }

        $scope.isConstain = function (menu)
        {

            if ($scope.listMenu.includes(menu)) {
                return true;
            }
            else
                return false;
        }


        getMenu();
    }

})(angular.module('ocms'));