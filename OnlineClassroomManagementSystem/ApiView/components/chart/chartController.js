(function (app) {
    app.controller('chartController', chartController);

    chartController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService', 'localStorageService'];

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


    function chartController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService, localStorageService) {
        //get course
        apiService.get('CourseManager', null, function (result) {
            $scope.courseData = [];

            result.data[0].forEach(function (element) {
                $scope.courseData.push(element);
            });
            $scope.Selected = $scope.courseData[0];
        }, function (erro) {
            alert('Lỗi get course API');
            });

        $scope.selectCourse = function () {
            //get class
            if ($scope.Selected.CourseID) {
                apiService.get('Course_Class/' + $scope.Selected.CourseID, null, function (result) {
                    $scope.classData = [];

                    result.data[0].forEach(function (element) {
                        $scope.classData.push(element);
                    });
                    if ($scope.classData.length) {
                    }
                    else {
                        alert('Khóa học ' + $scope.Selected.CourseName + ' chưa có lớp học');
                    }
                }, function (erro) {
                    alert('Lỗi getAPI');
                });
            }
        }

        window.onload = function () {
            
            var chartScore = new CanvasJS.Chart("chartScore",
                {
                    title: {
                        text: "Điểm trung bình"
                    },
                    data: [

                        {
                            dataPoints: [
                                { x: 1, y: 8, label: "Bài tập cộng" },
                                { x: 2, y: 3, label: "Bài tập trừ" },
                                { x: 3, y: 4.5, label: "Bài tập nhân" },
                                { x: 4, y: 9, label: "Bài tập chia" },
                            ]
                        }
                    ]
                });

            chartScore.render();
            var chartSkill = new CanvasJS.Chart("chartSkill",
                {
                    title: {
                        text: "Kĩ năng"
                    },
                    data: [

                        {
                            dataPoints: [
                                { x: 1, y: 5, label: "Cộng" },
                                { x: 2, y: 4, label: "Trừ" },
                                { x: 3, y: 3, label: "Nhân" },
                                { x: 4, y: 2, label: "Chia" },
                            ]
                        }
                    ]
                });

            chartSkill.render();
        }

    }
})(angular.module('ocms.chart'));