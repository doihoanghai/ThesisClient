(function (app) {
    app.controller('teacher_exerciseController', teacher_exerciseController);

    teacher_exerciseController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService'];

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


    function teacher_exerciseController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService) {
        //document.getElementById("title").innerHTML = 'Danh sách nộp bài ' + $state.params.exerciseName;
        var exerciseID = $state.params.exerciseID;// 
        $scope.updateModel = {};
        $scope.filterModal = {};
        $scope.addModal = {};
        $scope.studentModal = {};
        $scope.studentAddModal = {};
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = x;
        }
        $scope.studentData =[ { "FullName": "Đới Khoa", "Address": "Chung cư Trần Quốc Thảo", "BirthDay": "30/02/2020", "Email": "1453020@student.hcmus", "PhoneNumber": "19001080", "UserName": "khoaDoi", }];
    }
})(angular.module('ocms.teacher_exercise'));