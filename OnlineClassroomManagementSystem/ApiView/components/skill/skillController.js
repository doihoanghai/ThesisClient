(function (app) {
    app.controller('skillController', skillController);

    skillController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService', 'localStorageService'];

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


    function skillController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService, localStorageService) {
        $scope.fullData = [];
        $scope.curDataFilter = $scope.fullData;
        $scope.updateModal = {}; 
        $scope.addModal = {};
        $scope.filterModal = {};
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = x;
        }


        $scope.addSkill = function () {
            if (!$scope.addModal.SkillName) {
                alert("Tên kĩ năng còn thiếu");
                return;
            }
            if ($scope.skillNameData.indexOf($scope.addModal.SkillName.toLowerCase()) > -1) {
                alert("Tên kĩ năng đã có");
                $scope.addModal.SkillName = '';
                return;
            }
            if (!$scope.addModal.Description) {
                $scope.addModal.Description = '';
            }

            var skill = {
                "SkillID": $scope.addModal.SkillID,
                "SkillName": $scope.addModal.SkillName,
                "Description": $scope.addModal.Description
            }

            apiService.post('Skill', skill, function (result) {
                $scope.curDataFilter.push(skill);
                window.location.reload();
                //clear search field
                $scope.addModal.SkillName = null;
                $scope.addModal.Description = null;
            }, function (erro) {
                alert('Lỗi postAPI');
            });
        }

        $scope.removeSkill = function (index) {
            var name = $scope.curDataFilter[index].SkillName;
            if (confirm("Bạn có muốn xóa: " + name)) {

                apiService.del('Skill/' + $scope.curDataFilter[index].SkillID, null, function (result) {

                    //Remove the item from Array using Index.
                    $scope.curDataFilter.splice(index, 1);

                }, function (erro) {
                    alert('Lỗi delAPI');
                })
            }
        }
        $scope.editItem = [];
        $scope.editSkill = function (index, item) {
            $scope.updateModal.Description = item.Description;
            $scope.updateModal.SkillName = item.SkillName;
            $scope.updateModal.SkillID = item.SkillID;
            $scope.updateModal.index = index;
            
        }
        $scope.updateSkill = function () {
            if ($scope.skillNameData.indexOf($scope.updateModal.SkillName.toLowerCase()) > -1 &&
                $scope.skillNameData.indexOf($scope.updateModal.SkillName.toLowerCase()) != $scope.updateModal.index ) {
                alert("Tên kĩ năng đã có");
                return;
            }
            var skill = {
                "SkillID": $scope.updateModal.SkillID,
                "SkillName": $scope.updateModal.SkillName,
                "Description": $scope.updateModal.Description
            }
            apiService.put('Skill/' + $scope.updateModal.SkillID, skill, function (result) {
                $scope.curDataFilter[$scope.updateModal.index].SkillName = $scope.updateModal.SkillName;
                $scope.curDataFilter[$scope.updateModal.index].Description = $scope.updateModal.Description;
                $scope.editItem[index] = false;
            }, function (erro) {
                alert('Lỗi putAPI');
            });
        }

        function getData() {
            apiService.get('Skill', null, function (result) {
                $scope.curDataFilter = [];
                $scope.skillNameData = [];

                result.data[0].forEach(function (element) {
                    $scope.curDataFilter.push(element);
                    $scope.skillNameData.push(element.SkillName.toLowerCase());
                });
                $scope.fullData = $scope.curDataFilter;
            }, function (erro) {
                alert('Lỗi getAPI');
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
})(angular.module('ocms.skill'));