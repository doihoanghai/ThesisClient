(function (app) {
    app.controller('skillController', skillController);

    skillController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService'];

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


    function skillController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService) {
        $scope.fullData = [];
        $scope.curDataFilter = $scope.fullData;
        $scope.updateModel = {};
        $scope.addModal = {};
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = x;
        }


        $scope.addSkill = function () {
            if (!$scope.addModal.SkillName) {
                alert("Tên kĩ năng còn thiếu");
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
        $scope.editSkill = function (index) {
            $scope.editItem[index] = true;
        }
        $scope.updateSkill = function (index, edt) {
            apiService.put('Skill/' + edt.SkillID, edt, function (result) {
                $scope.curDataFilter[index].SkillName = edt.SkillName;
                $scope.curDataFilter[index].Description = edt.Description;
                $scope.editItem[index] = false;
            }, function (erro) {
                alert('Lỗi putAPI');
            });
        }

        function getData() {
            apiService.get('Skill', null, function (result) {
                $scope.curDataFilter = [];

                result.data[0].forEach(function (element) {
                    $scope.curDataFilter.push(element);
                });
                $scope.fullData = $scope.curDataFilter;
            }, function (erro) {
                alert('Lỗi getAPI');
            });
        }

        getData();

    }
})(angular.module('ocms.skill'));