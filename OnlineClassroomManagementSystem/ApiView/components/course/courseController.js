(function (app) {
    app.controller('courseController', courseController);

    courseController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService'];

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


    function courseController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService) {
        $scope.curDataFilter = [];
        $scope.fullData = [];
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = x;
        }
        $scope.updateModel = {};
        $scope.addModal = {};
        $scope.addCourse = function () {
            if (!$scope.addModal.CourseName) {
                alert("Tên khóa học còn thiếu");
                return;
            }
            if (!$scope.addModal.Description) {
                $scope.addModal.Description = '';
            }
            if (!$scope.addModal.NumOfStudent) {
                $scope.addModal.NumOfStudent = 0;
            }
            if ($scope.addModal.NumOfStudent < 0) {
                alert("Số lượng học sinh phải >=0");
                return
            }

            var course = {
                "CourseID": $scope.addModal.CourseID,
                "CourseName": $scope.addModal.CourseName,
                "Description": $scope.addModal.Description,
                "NumOfStudent": $scope.addModal.NumOfStudent
            }

            apiService.post('Course', course, function (result) {
                $scope.curDataFilter.push(course);
                window.location.reload();
                //clear search field
                $scope.addModal.CourseName = null;
                $scope.addModal.Description = null;
                $scope.addModal.NumOfStudent = null;
            }, function (erro) {
                    alert('Lỗi postAPI');
                });
            }
        

        $scope.removeCourse = function (index) {
            var name = $scope.curDataFilter[index].CourseName;
            
            if (confirm("Bạn có muốn xóa: " + name)) {
                apiService.del('Course/' + $scope.curDataFilter[index].CourseID,null, function (result) {

                //Remove the item from Array using Index.
                    $scope.curDataFilter.splice(index, 1);

                }, function (erro) {
                    alert('Lỗi delAPI');
                })
            }
        }
        $scope.editItem = [];
        $scope.editCourse = function (index) {
            $scope.editItem[index] = true;
        }

        $scope.updateCourse = function (index, edt) {

            if (edt.NumOfStudent < 0) {
                alert("Số lượng học sinh phải >=0");
                return
            }
            apiService.put('Course/' + edt.CourseID, edt, function (result) {
                $scope.curDataFilter[index].CourseName = edt.CourseName;
                $scope.curDataFilter[index].Description = edt.Description;
                $scope.curDataFilter[index].NumOfStudent = edt.NumOfStudent;
                $scope.editItem[index] = false;
            }, function (erro) {
                alert('Lỗi putAPI');
            });
            
        }

        function getData() {
            apiService.get('Course', null, function (result) {
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
})(angular.module('ocms.course'));