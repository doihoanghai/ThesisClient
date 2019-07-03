(function (app) {
    app.controller('category_courseController', category_courseController);

    category_courseController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService', 'localStorageService'];

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


    function category_courseController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService, localStorageService) {

        var checkToken = localStorageService.get("TokenInfo");
        $scope.UserLevel = localStorageService.get("UserLevel");
        if (checkToken && $scope.UserLevel == 1) {
        }
        else {
            window.location.href = 'http://localhost:2697/#!/login'
        }
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = x;
        }
        document.getElementById("title").innerHTML = 'Quản lý khóa học cho hạng mục '+$state.params.categoryName;
        $scope.fullData = [];
        var categoryID = $state.params.categoryID;// courseID
        $scope.isAdded;//each row checbox value
        $scope.updateModel = {};
        $scope.addModal = {};
        //pre-load
        $scope.isAdded = true;//get checked list
        apiService.get('Category_Course/' + categoryID, null, function (result) {
            $scope.curDataFilter = [];

            result.data[0].forEach(function (element) {
                $scope.curDataFilter.push(element);
            });
            $scope.addedData = $scope.curDataFilter;
        }, function (erro) {

        });


        $(".exercise").change(function () {
            var val = $('.exercise:checked').val();//view by
            if (val == 'added') {
                $scope.isAdded = true;//get checked list
                apiService.get('Category_Course/' + categoryID, null, function (result) {
                    $scope.curDataFilter = [];
                    $scope.addedData = [];

                    result.data[0].forEach(function (element) {
                        $scope.curDataFilter.push(element);
                    });
                    $scope.addedData = $scope.curDataFilter;
                }, function (erro) {

                });
            }
            if (val == 'not_added') {
                $scope.isAdded = false;//get unchecked list
                apiService.get('Course/', null, function (result) {
                    $scope.curDataFilter = [];
                    $scope.fullData = [];

                    result.data[0].forEach(function (element) {
                        $scope.fullData.push(element);
                    });
                    for (var i = 0; i < $scope.fullData.length; i++)
                        if (containsObject($scope.fullData[i], $scope.addedData) === false) {
                            $scope.curDataFilter.push($scope.fullData[i]);
                    }
                }, function (erro) {
                    alert('Lỗi getAPI');
                });
            }
        }
        );

        function containsObject(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i].CourseID === obj.CourseID) {
                    return true;
                }
            }

            return false;
        }

        $scope.cbClicked = function (index) {
            var checked = document.getElementById("cb").value;
            //checked = add
            if (checked == true) {
                addCourse(index);
                alert('Add ' + index + ' to Checked');
            }
            //unchecked = remove
            if (checked == false) {
                removeCourse(index);
                alert('Remove ' + index + ' from Checked');
            }
        }

        $scope.addCourse = function (index) {

            var course = {
                "CourseID": $scope.curDataFilter[index].CourseID,
                "CourseName": $scope.curDataFilter[index].CourseName,
                "Description": $scope.curDataFilter[index].Description,
                "NumOfStudent": $scope.curDataFilter[index].NumOfStudent
            }

            if (confirm("Bạn có muốn thêm khóa học " + $scope.curDataFilter[index].CourseName + " vào hạng mục " + $state.params.categoryName + "?")) {
                apiService.post('Category_Course/' + categoryID, course, function (result) {
                    $scope.curDataFilter.splice(index, 1);//remove checked row from unchecked list
                    alert("Khóa học " + $scope.curDataFilter[index].CourseName + " đã được thêm vào hạng mục " + $state.params.categoryName);
                },
                    function (erro) {
                        alert('Lỗi postAPI');
                    });
            }


            
        }


        $scope.removeCourse = function (index) {
            var name = $scope.curDataFilter[index].CourseName;
            var courseID = $scope.curDataFilter[index].CourseID;

            if (confirm("Bạn có muốn xóa khóa học " + name + " khỏi hạng mục " + $state.params.categoryName+"?")) {
                apiService.del('Category_Course/' + courseID + '/' + categoryID, null, function (result) {
                    $scope.curDataFilter.splice(index, 1);//remove unchecked row from checked list
                    alert("Khóa học " + name + " đã được xóa khỏi hạng mục " + $state.params.categoryName);
                }, function (erro) {
                    alert('Lỗi delAPI');
                })
            }
        }
    }
})(angular.module('ocms.category_course'));