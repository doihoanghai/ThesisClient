(function (app) {
    app.controller('categoryController', categoryController);

    categoryController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService', 'localStorageService'];

    app.directive('onFinishRender', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                        if (!!attr.onFinishRender) {
                            $parse(attr.onFinishRender)(scope);
                        }
                    });
                }

                if (!!attr.onStartRender) {
                    if (scope.$first === true) {
                        $timeout(function () {
                            scope.$emit('ngRepeatStarted');
                            if (!!attr.onStartRender) {
                                $parse(attr.onStartRender)(scope);
                            }
                        });
                    }
                }
            }
        }
    }]);


    function categoryController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService, localStorageService) {
        $scope.fullData = [];
        $scope.curDataFilter = $scope.fullData;
        $scope.filterModal = {};
        $scope.updateModal = {};
        $scope.addModal = {};
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = x;
        }

        $scope.test = function () {
            $scope.addModal.CategoryName = 'test';
        }

        $scope.addCategory = function () {
            if (!$scope.addModal.CategoryName) {
                alert("Tên hạng mục còn thiếu");
                return;
            }
            if (!$scope.addModal.Description) {
                $scope.addModal.Description = '';
            }

            var category = {
                "CategoryID": $scope.addModal.CategoryID,
                "CategoryName": $scope.addModal.CategoryName,
                "Description": $scope.addModal.Description
            }

            apiService.post('Category/', category, function (result) {
                $scope.curDataFilter.push(category);
                //clear search field
                $scope.addModal.CategoryName = null;
                $scope.addModal.Description = null;
            }, function (erro) {
                alert('Lỗi postAPI');
            });
        }

        $scope.removeCategory = function (index) {
            var name = $scope.curDataFilter[index].CategoryName;
            if (confirm("Bạn có muốn xóa: " + name)) {
                //Remove the item from Array using Index.
                apiService.del('Category/' + $scope.curDataFilter[index].CategoryID, null, function (result) {
                    $scope.curDataFilter.splice(index, 1);

                }, function (erro) {
                    alert('Lỗi delAPI');
                })
            }
        }

        $scope.editItem = [];
        $scope.editCategory = function (index, item) {
            $scope.updateModal.Description = item.Description;
            $scope.updateModal.CategoryName = item.CategoryName;
            $scope.updateModal.CategoryID = item.CategoryID;
            $scope.index = index;
        }
        $scope.updateCategory = function () {
            apiService.put('Category/' + $scope.updateModal.CategoryID, $scope.updateModal, function (result) {
                $scope.curDataFilter[$scope.index].CategoryName = $scope.updateModal.CategoryName;
                $scope.curDataFilter[$scope.index].Description = $scope.updateModal.Description;
            }, function (erro) {
                alert('Lỗi putAPI');
            });
        }


        function getData() {
            apiService.get('Category', null, function (result) {
                $scope.curDataFilter = [];

                result.data[0].forEach(function (element) {
                    $scope.curDataFilter.push(element);
                });
                $scope.fullData = $scope.curDataFilter;
            }, function (erro) {

            });
        }
        var checkToken = localStorageService.get("TokenInfo");
        $scope.UserLevel = localStorageService.get("UserLevel");
        if (checkToken && $scope.UserLevel == 1) {
            getData();
        }
        else {
            window.location.href = 'http://localhost:2697/#!/login'
        }
    }
})(angular.module('ocms.category'));