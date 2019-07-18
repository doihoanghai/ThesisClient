(function (app) {
    app.controller('course_detailController', course_detailController);

    course_detailController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService', 'localStorageService'];

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


    function course_detailController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService, localStorageService) {

       
        document.getElementById("title").innerHTML = 'Quản lý khóa học ' + $state.params.courseName;
        var courseID = $state.params.courseID;// courseID
        ///////////////////////
        //// COURSE SKILL ////
        ///////////////////////
        $scope.isAddedSkill = true;//each skill checbox value

        //pre-load added skills//
        apiService.get('CourseSkill/' + courseID, null, function (result) {
            $scope.skillData = [];
            $scope.addedSkillData = [];
            result.data[0].forEach(function (element) {
                $scope.skillData.push(element);
                $scope.addedSkillData.push(element);
            });
        }, function (erro) {
            alert('Lỗi getAPI');
            });

        //load by added or not//
        $(".skill").change(function () {

            var val = $('.skill:checked').val();//view by
            if (val == 'added') {
                $scope.isAddedSkill = true;//get checked list
                apiService.get('CourseSkill/' + courseID, null, function (result) {
                    $scope.skillData = [];
                    if (result.data.length > 0) {
                        result.data[0].forEach(function (element) {
                            $scope.skillData.push(element);
                        });  }
                }, function (erro) {
                    alert('Lỗi getAPI');
                });
            }
            if (val == 'not_added') {
                $scope.isAddedSkill = false;//get unchecked list
                apiService.get('Skill/', null, function (result) {
                    $scope.fullSkillData = [];
                    $scope.skillData = [];

                    result.data[0].forEach(function (element) {
                        $scope.fullSkillData.push(element);
                    });
                    for (var i = 0; i < $scope.fullSkillData.length; i++) {
                        if (containsObject($scope.fullSkillData[i], $scope.addedSkillData) === false) {
                            $scope.skillData.push($scope.fullSkillData[i]);
                        }
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
                if (list[i].SkillID === obj.SkillID) {
                    return true;
                }
            }

            return false;
        }
        

        $scope.addSkill = function (index) {

            var skill = {
                "SkillID": $scope.skillData[index].SkillID,
                "CourseID": courseID
            }

            if (confirm("Bạn có muốn thêm kĩ năng " + $scope.skillData[index].SkillName + " vào khóa học " + $state.params.courseName + "?")) {
                apiService.post('CourseSkill/' + courseID, skill, function (result) {
                    $scope.skillData.splice(index, 1);//remove checked row from unchecked list
                    alert("Kĩ năng " + $scope.skillData[index].SkillName + "  đã được thêm vào khóa học " + $state.params.courseName);
                },
                    function (erro) {
                        alert('Lỗi postAPI');
                    });
            }


            
        }


        $scope.removeSkill = function (index) {
            var name = $scope.skillData[index].SkillName;
            var skillID = $scope.skillData[index].SkillID;
            if (confirm("Bạn có muốn xóa kĩ năng " + name + " khỏi khóa học " + $state.params.courseName + "?")) {
                apiService.del('CourseSkill/' +courseID + '/' + skillID , null, function (result) {
                    $scope.skillData.splice(index, 1);//remove unchecked row from checked list
                    alert("kĩ năng " + name + "  đã được xóa khỏi khóa học " + $state.params.courseName);

                }, function (erro) {
                    alert('Lỗi delAPI');
                })
            }
        }


        ///////////////////////
        //// COURSE TEACHER ///
        ///////////////////////
        $scope.teacherInfo = {};
        apiService.get('CourseTeacher/' + courseID, null, function (result) {
            $scope.teacherInfo.Name = result.data[0][0].FullName;
            $scope.teacherInfo.Phone = result.data[0][0].PhoneNumber;
            $scope.teacherInfo.Address = result.data[0][0].Address;
            $scope.teacherInfo.Email = result.data[0][0].Email;
        }, function (erro) {
            alert('Lỗi getAPI');
        });

        //////////////////////
        //// COURSE CLASS ///
        ////////////////////
        function getClass() {
            apiService.get('Course_Class/' + courseID, null, function (result) {
                $scope.classData = [];
                $scope.classNameData = [];

                result.data[0].forEach(function (element) {
                    $scope.classData.push(element);
                    $scope.classNameData.push(element.ClassName.toLowerCase());

                });
            }, function (erro) {
                alert('Lỗi getAPI');
            });
        }
        getClass();
        $scope.addModal = {}
        $scope.updateModal = {}
        //ADD
        $scope.addClass = function () {
            if (!$scope.addModal.ClassName) {
                alert("Tên lớp học còn thiếu");
                return;
            }
            if ($scope.classNameData.indexOf($scope.addModal.ClassName.toLowerCase()) > -1) {
                alert("Tên lớp học đã có");
                $scope.addModal.ClassName = '';
                return;
            }
            if (!$scope.addModal.NumOfStudent) {
                $scope.addModal.NumOfStudent = 0;
            }
            if ($scope.addModal.NumOfStudent < 0) {
                alert("Số lượng học sinh phải >=0");
                return
            }
            var Class = {
                "ClassID": $scope.addModal.ClassID,
                "ClassName": $scope.addModal.ClassName,
                "CourseID": courseID,
                "NumOfStudent": $scope.addModal.NumOfStudent
            }
            apiService.post('Class/', Class, function (result) {
                $scope.classData.push(Class);
                //clear search field
                $scope.addModal.ClassName = '';
                $scope.addModal.NumOfStudent = '';
            }, function (erro) {
                alert('Lỗi postAPI');
            });
        }
        //DEL
        $scope.removeClass = function (index) {
            var name = $scope.classData[index].ClassName;
            if (confirm("Bạn có muốn xóa: " + name)) {
                apiService.del('Class/' + $scope.classData[index].ClassID, null, function (result) {
                    //Remove the item from Array using Index.
                    $scope.classData.splice(index, 1);
                }, function (erro) {
                    alert('Lỗi delAPI');
                })
            }
        }
        //EDIT
        $scope.ClassItem = [];
        $scope.editClass = function (index, item) {
            $scope.updateModal.ClassID = item.ClassID;
            $scope.updateModal.ClassName = item.ClassName;
            $scope.updateModal.NumOfStudent = item.NumOfStudent;
            $scope.updateModal.CourseID = courseID;
            $scope.index = index;
        }
        //UPDATE
        $scope.updateClass = function () {
            if ($scope.classNameData.indexOf($scope.updateModal.ClassName.toLowerCase()) > -1 &&
                $scope.classNameData.indexOf($scope.updateModal.ClassName.toLowerCase()) != $scope.index) {
                alert("Tên lớp học đã có");
                return;
            }
            
            if ($scope.updateModal.NumOfStudent < 0) {
                alert("Số lượng học sinh phải >=0");
                return
            }
            apiService.put('Class/' + $scope.updateModal.ClassID, $scope.updateModal, function (result) {
                $scope.classData[$scope.index].ClassID = $scope.updateModal.ClassID;
                $scope.classData[$scope.index].ClassName = $scope.updateModal.ClassName;
                $scope.classData[$scope.index].NumOfStudent = $scope.updateModal.NumOfStudent;
                $scope.ClassItem[$scope.index] = false;
            }, function (erro) {
                alert('Lỗi putAPI');
            });
        }

        /////////////////////////
        //// COURSE EXERCISE ////
        /////////////////////////
        $scope.updateModel = {};
        $scope.addModal = {};
        
        //GET
        function getExercise() {
            apiService.get('Course_Exercise/' + courseID, null, function (result) {
                $scope.exerciseData = [];

                result.data[0].forEach(function (element) {
                    $scope.exerciseData.push(element);
                });
            }, function (erro) {
                alert('Lỗi getAPI');
            });
        }
            getExercise();
        //ADD
        $scope.addExercise = function () {
            if (!$scope.addModal.ExerciseName) {
                alert("Tên bài tập còn thiếu");
                return;
            }
            if (!$scope.addModal.Description) {
                $scope.addModal.Description = '';
            }
            if (!$scope.addModal.ExerciseTime) {
                $scope.addModal.ExerciseTime = 0;
            }
            if ($scope.addModal.ExerciseTime < 0) {
                alert("Thời gian làm bài phải >=0");
                return
            }
            if (!$scope.addModal.Note) {
                $scope.addModal.Note = '';
            }
            if (!$scope.addModal.ExerciseScore) {
                $scope.addModal.ExerciseScore = 0;
            }
            if ($scope.addModal.ExerciseScore < 0) {
                alert("Điểm số bài tập phải >=0");
                return
            }
            if (!$scope.addModal.ExercisePath) {
                $scope.addModal.ExercisePath = '';
            }
            var exercise = {
                "CourseID": courseID,
                "ExerciseID": $scope.addModal.ExerciseID,
                "ExerciseName": $scope.addModal.ExerciseName,
                "Description": $scope.addModal.Description,
                "ExerciseTime": $scope.addModal.ExerciseTime,
                "ExerciseScore": $scope.addModal.ExerciseScore,
                "ExercisePath": $scope.addModal.ExercisePath,
                "Note": $scope.addModal.Note
            }
            apiService.post('Exercise/', exercise, function (result) {
                $scope.exerciseData.push(exercise);
                window.location.reload();
                //clear search field
                $scope.addModal.ExerciseName = null;
                $scope.addModal.Description = null;
                $scope.addModal.ExerciseTime = null;
                $scope.addModal.ExerciseScore = null;
                $scope.addModal.ExercisePath = null;
                $scope.addModal.Note = null;
            }, function (erro) {
                alert('Lỗi postAPI');
            });
        }
        //DEL
        $scope.removeExercise = function (index) {
            var name = $scope.exerciseData[index].ExerciseName;
            if (confirm("Bạn có muốn xóa: " + name)) {
                apiService.del('Exercise/' + $scope.exerciseData[index].ExerciseID, null, function (result) {
                    //Remove the item from Array using Index.
                    $scope.exerciseData.splice(index, 1);
                }, function (erro) {
                    alert('Lỗi delAPI');
                })
            }
        }
        //EDIT
        $scope.editItem = [];
        $scope.editExercise = function (index) {
            $scope.editItem[index] = true;
        }
        $scope.updateExercise = function (index, edt) {

            if (edt.ExerciseScore < 0) {
                alert("Điểm số bài tập phải >=0");
                return
            }
            if (edt.ExerciseTime < 0) {
                alert("Thời gian làm bài phải >=0");
                return
            }
            apiService.put('Exercise/' + edt.ExerciseID, edt, function (result) {
                $scope.exerciseData[index].ExerciseID = edt.ExerciseID;
                $scope.exerciseData[index].ExerciseName = edt.ExerciseName;
                $scope.exerciseData[index].Description = edt.Description;
                $scope.exerciseData[index].ExerciseTime = edt.ExerciseTime;
                $scope.exerciseData[index].ExerciseScore = edt.ExerciseScore;
                $scope.exerciseData[index].ExercisePath = edt.ExercisePath;
                $scope.exerciseData[index].Note = edt.Note;
                $scope.editItem[index] = false;
            }, function (erro) {
                alert('Lỗi putAPI');
            });
        }

        

    }
})(angular.module('ocms.course_detail'));