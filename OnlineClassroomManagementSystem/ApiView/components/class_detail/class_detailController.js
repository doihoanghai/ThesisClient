(function (app) {
    app.controller('class_detailController', class_detailController);

    class_detailController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService'];

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


    function class_detailController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService) {
        var classID = $state.params.classID;// classID
        $scope.updateModel = {};
        $scope.addModal = {};
        $scope.studentModal = {};
        $scope.studentAddModal = {};
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = x;
        }
        ////TEACHER////
        $scope.isAddedTeacher = true;//each Teacher checbox value
        //pre-load added//
        apiService.get('Class_Teacher/' + classID, null, function (result) {
            $scope.teacherData = [];
            $scope.addedTeacherData = [];
            result.data[0].forEach(function (element) {
                $scope.teacherData.push(element);
                $scope.addedTeacherData.push(element);
            });
        }, function (erro) {
            alert('Lỗi getAPI');
        });

        //load by added or not//
        $(".teacher").change(function () {

            var val = $('.teacher:checked').val();//view by
            if (val == 'added') {
                $scope.isAddedTeacher = true;//get checked list
                apiService.get('Class_Teacher/' + classID, null, function (result) {
                    $scope.teacherData = [];
                    if (result.data.length > 0) {
                        result.data[0].forEach(function (element) {
                            $scope.teacherData.push(element);
                        });
                    }
                }, function (erro) {
                    alert('Lỗi getAPI');
                });
            }
            if (val == 'not_added') {
                $scope.isAddedTeacher = false;//get unchecked list
                apiService.get('Teacher/', null, function (result) {
                    $scope.fullTeacherData = [];
                    $scope.teacherData = [];

                    result.data[0].forEach(function (element) {
                        $scope.fullTeacherData.push(element);
                    });
                    if ($scope.addedTeacherData.length > 0) {
                        for (var i = 0; i < $scope.fullTeacherData.length; i++) {
                            if (containsObject($scope.fullTeacherData[i], $scope.addedTeacherData) === false) {
                                $scope.teacherData.push($scope.fullTeacherData[i]);
                            }
                        }
                    }
                    else {
                        $scope.fullTeacherData.forEach(function (element) {
                            $scope.teacherData.push(element);
                        });
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
                if (list[i].Id === obj.Id) {
                    return true;
                }
            }
            return false;
        }

        //ADD
        $scope.addTeacher = function (index) {

            var teacher = {
                "ClassID": $state.params.classID,
                "TeacherID": $scope.teacherData[index].Id,
                "FullName": $scope.teacherData[index].FullName,
                "Address": $scope.teacherData[index].Address,
                "BirthDay": $scope.teacherData[index].BirthDay,
                "Email": $scope.teacherData[index].Email,
                "PhoneNumber": $scope.teacherData[index].PhoneNumber,
                "UserName": $scope.teacherData[index].UserName
            }

            if (confirm("Bạn có muốn giáo viên " + teacher.FullName + " vào lớp học " + $state.params.className + "?")) {
                apiService.post('Class_Teacher/' + $state.params.classID, teacher, function (result) {
                    alert("Giáo viên " + teacher.FullName + "  đã được thêm vào lớp học " + $state.params.className);
                },
                    function (erro) {
                        alert('Lỗi postAPI');
                    });
            }
            //remove checked row from unchecked list
            $scope.teacherData.splice(index, 1);
        }

        //REMOVE
        $scope.removeTeacher = function (index) {
            var name = $scope.teacherData[index].FullName;
            if (confirm("Bạn có muốn xóa giáo viên: " + name + " khỏi lớp học " + $state.params.className + "?")) {
                apiService.del('Class_Teacher/' + $state.params.classID + '/' + $scope.teacherData[index].Id, null, function (result) {
                    alert("Giáo viên " + name + "  đã được xóa khỏi lớp học " + $state.params.className);

                }, function (erro) {
                    alert('Lỗi delAPI');
                })

                //Remove the item from Array using Index.
                $scope.teacherData.splice(index, 1);//remove unchecked row from checked list
            }
        }

        //STUDENT
        //pre-load added//
        $scope.isAddedStudent = true;//get checked list
        apiService.get('Class_Student/Class/' + classID, null, function (result) {
            $scope.studentData = [];
            $scope.addedStudentData = [];
            result.data[0].forEach(function (element) {
                $scope.studentData.push(element);
                $scope.addedStudentData.push(element);
            });
        }, function (erro) {
            alert('Lỗi getAPI');
        });

        //load by added or not//
        $(".student").change(function () {

            var val = $('.student:checked').val();//view by
            if (val == 'added') {
                $scope.isAddedStudent = true;//get checked list
                apiService.get('Class_Student/Class/' + classID, null, function (result) {
                    $scope.studentData = [];
                    if (result.data.length > 0) {
                        result.data[0].forEach(function (element) {
                            $scope.studentData.push(element);
                        });
                    }
                }, function (erro) {
                    alert('Lỗi getAPI');
                });
            }
            if (val == 'not_added') {
                $scope.isAddedStudent = false;//get unchecked list
                apiService.get('Student/', null, function (result) {
                    $scope.fullStudentData = [];
                    $scope.studentData = [];

                    result.data[0].forEach(function (element) {
                        $scope.fullStudentData.push(element);
                    });
                    if ($scope.addedStudentData.length > 0) {
                        for (var i = 0; i < $scope.fullStudentData.length; i++) {
                            if (containsObject($scope.fullStudentData[i], $scope.addedStudentData) === false) {
                                $scope.studentData.push($scope.fullStudentData[i]);
                            }
                        }
                    }
                    else {
                        $scope.fullStudentData.forEach(function (element) {
                            $scope.studentData.push(element);
                        });
                    }
                }, function (erro) {
                    alert('Lỗi getAPI');
                });
            }
        }
        );

        //ADD
        $scope.addStudent = function (index) {

            var student = {
                "ClassID": $state.params.classID,
                "StudentID": $scope.studentData[index].Id,
                "FullName": $scope.studentData[index].FullName,
                "Address": $scope.studentData[index].Address,
                "BirthDay": $scope.studentData[index].BirthDay,
                "Email": $scope.studentData[index].Email,
                "PhoneNumber": $scope.studentData[index].PhoneNumber,
                "UserName": $scope.studentData[index].UserName
            }

            if (confirm("Bạn có muốn học sinh " + student.FullName + " vào lớp học " + $state.params.className + "?")) {
                apiService.post('Class_Student/Class/' + $state.params.classID, student, function (result) {
                    alert("Học sinh " + student.FullName + "  đã được thêm vào lớp học " + $state.params.className);
                },
                    function (erro) {
                        alert('Lỗi postAPI');
                    });
            }
            //remove checked row from unchecked list
            $scope.studentData.splice(index, 1);
        }
        //CREATE
        $scope.createStudent = function (index) {
            if (!$scope.studentModal.StudentFullName) {
                alert('Họ tên học sinh còn thiếu');
                return
            }
            if (!$scope.studentModal.StudentUsername) {
                alert('Tên đăng nhập còn thiếu');
                return
            }
            var student = {

                "FullName": $scope.studentAddModal.StudentFullName,
                "Address": $scope.studentAddModal.StudentAddress,
                "BirthDay": $scope.studentAddModal.StudentBirthDay,
                "Email": $scope.studentAddModal.StudentEmail,
                "PhoneNumber": $scope.studentAddModal.StudentPhoneNumber,
                "UserName": $scope.studentAddModal.StudentUsername,
                "Password": '123456789',
                "UserLevel":2
            }

            if (confirm("Bạn có muốn học sinh " + student.FullName + " vào lớp học " + $state.params.className + "?")) {
                apiService.post('signup', student, function (result) {
                    var create = {
                        "ClassID": $state.params.classID,
                        "StudentID": result.data[0].Id,
                    }
                    apiService.post('Class_Student/Class/' + $state.params.classID, create, function (result) {
                        alert("Học sinh " + student.FullName + "  đã được thêm vào lớp học " + $state.params.className);
                        $scope.studentAddModal.StudentFullName = '';
                        $scope.studentAddModal.StudentAddress = '';
                        $scope.studentAddModal.StudentBirthDay = '';
                        $scope.studentAddModal.StudentEmail = '';
                        $scope.studentAddModal.StudentPhoneNumber = '';
                        $scope.studentAddModal.StudentUsername = '';
                    },
                        function (erro) {
                            alert('Lỗi postAPI');
                        });
                },
                    function (erro) {
                        alert('Lỗi postAPI');
                    });
                
            }
            //remove checked row from unchecked list
            $scope.studentData.splice(index, 1);
        }
        //REMOVE
        $scope.removeStudent = function (item) {
            var name = item.FullName;
            if (confirm("Bạn có muốn xóa học sinh: " + name + " khỏi lớp học " + $state.params.className + "?")) {
                apiService.del('Class_Student/' + classID + '/' + item.Id, null, function (result) {
                    alert("Học sinh " + name + "  đã được xóa khỏi lớp học " + $state.params.className);

                }, function (erro) {
                    alert('Lỗi delAPI');
                })

                //Remove the item from Array using Index.
                $scope.studentData.splice(index, 1);//remove unchecked row from checked list
            }
        }
            
    }
})(angular.module('ocms.class_detail'));