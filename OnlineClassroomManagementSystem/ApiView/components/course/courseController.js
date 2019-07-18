(function (app) {
    app.controller('courseController', courseController);

    courseController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService', 'localStorageService'];

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


    function courseController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService, localStorageService) {
        $scope.curDataFilter = [];
        $scope.fullData = [];
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = x;
        }
        $scope.updateModal = {};
        $scope.addModal = {};
        $scope.filterModal = {};
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
        $scope.editCourse = function (index, item) {
            $scope.updateModal.Description = item.Description;
            $scope.updateModal.CourseName = item.CourseName;
            $scope.updateModal.NumOfStudent = item.NumOfStudent;
            $scope.updateModal.CourseID = item.CourseID;
            $scope.updateModal.index = index;

        }

        $scope.updateCourse = function () {

            if ($scope.updateModal.NumOfStudent < 0) {
                alert("Số lượng học sinh phải >=0");
                return
            }

            if ($scope.courseNameData.indexOf($scope.updateModal.CourseName.toLowerCase()) > -1 &&
                $scope.courseNameData.indexOf($scope.updateModal.CourseName.toLowerCase()) != $scope.updateModal.index ) {
                alert("Tên kĩ năng đã có");
                return;
            }
            var course = {
                "CourseID": $scope.updateModal.CourseID,
                "CourseName": $scope.updateModal.CourseName,
                "Description": $scope.updateModal.Description,
                "NumOfStudent": $scope.updateModal.NumOfStudent
            }
            apiService.put('Course/' + $scope.updateModal.CourseID, course, function (result) {
                $scope.curDataFilter[$scope.updateModal.index].CourseName = $scope.updateModal.CourseName;
                $scope.curDataFilter[$scope.updateModal.index].Description = $scope.updateModal.Description;
                $scope.curDataFilter[$scope.updateModal.index].NumOfStudent = $scope.updateModal.NumOfStudent;
                $scope.editItem[index] = false;
            }, function (erro) {
                alert('Lỗi putAPI');
            });
        }

        function getData() {
            apiService.get('CourseManager', null, function (result) {
                $scope.curDataFilter = [];
                $scope.courseNameData = [];

                result.data[0].forEach(function (element) {
                    $scope.curDataFilter.push(element);
                    $scope.courseNameData.push(element.CourseName.toLowerCase());
                });
                $scope.fullData = $scope.curDataFilter;
            }, function (erro) {
                alert('Lỗi getAPI');
            });
        }
        getData();
    }
})(angular.module('ocms.course'));