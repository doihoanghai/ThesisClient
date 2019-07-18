﻿(function (app) {
    app.controller('student_exerciseController', student_exerciseController);

    student_exerciseController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService', 'localStorageService'];



    function student_exerciseController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService, localStorageService) {
        $scope.CurQuestion = {};
        $scope.cauhoi = {};
        $scope.updateModal = {};
        $scope.updateAnswer = {};
        $scope.addModal = {};
        $scope.questionData = {};
        $scope.answerData = {};
        $scope.answerData2 = {};
        $scope.showSingle = true;
        //Question//
        ////ADD
        $scope.addQuestion = function () {
            if (!$scope.addModal.QuestionContent) {
                alert("Nội dung câu hỏi còn thiếu");
                return
            }
            //get question type value
            var qType = document.getElementById('questionType').selectedIndex;
            //reset question type value
            document.getElementById("questionType").value = 0;
            if (!qType || qType==0) {
                alert("Chưa chọn loại câu hỏi");
                return
            }
            if (!$scope.addModal.QuestionTime) {
                $scope.addModal.QuestionTime = 0;
            }
            if ($scope.addModal.QuestionTime < 0) {
                alert("Thời gian trả lời phải >=0");
                return
            }
            if (!$scope.addModal.Score) {
                $scope.addModal.Score = 0;
            }
            if ($scope.addModal.Score < 0) {
                alert("Điểm số câu hỏi phải >=0");
                return
            }
            var question = {
                "QuestionID": $scope.addModal.QuestionID,
                "QuestionContent": $scope.addModal.QuestionContent,
                "QuestionType": qType,
                "QuestionTime": $scope.addModal.QuestionTime,
                "AnswerID": $scope.addModal.AnswerID,
                "Score": $scope.addModal.Score,
                "ExerciseID": $state.params.exerciseID
            }

            apiService.post('Question', question, function (result) {
                $scope.curDataFilter.push(question);
                alert('Câu hỏi đã được thêm')
                //clear search field
                $scope.addModal.QuestionContent = null;
                $scope.addModal.QuestionType = null;
                $scope.addModal.QuestionTime = null;
                $scope.addModal.Score = null;
            }, function (erro) {
                alert('Lỗi postAPI');
            });
        }
        ////EDIT
        $scope.editQuestion = function (index) {
            $scope.updateModal.QuestionContent = $scope.curDataFilter[index].QuestionContent;
            $scope.updateModal.QuestionType = $scope.curDataFilter[index].QuestionType;
            $scope.updateModal.QuestionTime = $scope.curDataFilter[index].QuestionTime;
            $scope.updateModal.Score = $scope.curDataFilter[index].Score;
        }
        ////UPDATE
        $scope.updateQuestion = function (edt, index) {
            
            if (edt.Score < 0) {
                alert("Điểm số câu hỏi phải >=0");
                return
            }
            if (edt.QuestionTime < 0) {
                alert("Thời gian trả lời phải >=0");
                return
            }
            if ($scope.showSingle) {
                var qType = document.getElementById("questionType1").options[document.getElementById("questionType1").selectedIndex].value;
            }
            else {
                var qType = document.getElementById("questionType2").options[document.getElementById("questionType2").selectedIndex].value;
            }

            if (!qType) {
                alert("Chưa chọn loại câu hỏi");
                return
            }
            var question = {
                "QuestionID": edt.QuestionID,
                "QuestionContent": edt.QuestionContent,
                "QuestionType": qType,
                "QuestionTime": edt.QuestionTime,
                "AnswerID": edt.AnswerID,
                "Score": edt.Score,
                "ExerciseID": $state.params.exerciseID
            }
            apiService.put('Question/' + $scope.curDataFilter[index].QuestionID, question, function (result) {
                $scope.curDataFilter[index].QuestionContent = edt.QuestionContent;
                $scope.curDataFilter[index].QuestionType = qType;
                $scope.curDataFilter[index].QuestionTime = edt.QuestionTime;
                $scope.curDataFilter[index].Score = edt.Score;
                alert('Câu hỏi đã được cập nhật');
            }, function (erro) {
                alert('Lỗi putAPI');
            });
        }
        //UPDATE ANSWER ID
        $scope.chooseAnswer = function (question, answer) {
            var question = {
                "QuestionContent": question.QuestionContent,
                "QuestionType": question.QuestionType,
                "QuestionTime": question.QuestionTime,
                "Score": question.Score,
                "AnswerID": answer.AnswerID,
                "ExerciseID": $state.params.exerciseID,
            }
            apiService.put('Question/' + answer.QuestionID, question, function () {
                alert('Câu trả lời ' + answer.AnswerContent + ' đã được chọn là đáp án')
            }, function (erro) {
                alert('Lỗi putAPI');
            });
        }
        //DELETE
        $scope.removeQuestion = function (index) {
            var name = $scope.curDataFilter[index].QuestionContent;
            if (confirm("Bạn có muốn xóa: " + name)) {
                apiService.del('Question/' + $scope.curDataFilter[index].QuestionID, null, function (result) {

                    //Remove the item from Array using Index.
                    $scope.curDataFilter.splice(index, 1);

                }, function (erro) {
                    alert('Lỗi delAPI');
                })
            }
        }

        //Answer//
        //Load Answer Each
        $scope.val = function () {
            $scope.qIndex = document.getElementById("question").value;
            $scope.showSingle = true;
            //GET ANSWER EACH
            $scope.answerData = [];
            apiService.get('Answer/' + $scope.curDataFilter[$scope.qIndex].QuestionID, null, function (result) {
                //$scope.qIndex = $scope.curDataFilter[$scope.qIndex].QuestionID;
                result.data[0].forEach(function (element) {
                    $scope.answerData.push(element);
                });
                for (var j = 0; j < $scope.answerData.length; j++) {
                    if ($scope.curDataFilter[$scope.qIndex].AnswerID == $scope.answerData[j].AnswerID) {
                        var answerID = "answer" + j; 
                        var ao=document.getElementById(answerID);
                        $('#' + answerID).prop('checked', true);
                        //var radioButton = document.getElementById(answerID);
                        //radioButton.checked = true;
                        }
                    }
                
            }, function (erro) {
                alert('Lỗi getAPI');
            });
        }
        ////ADD
        $scope.addAnswer = function (index) {
            if (!$scope.addModal.AnswerContent) {
                alert("Nội dung câu trả lời còn thiếu");
                return
            }

            var answer = {
                "AnswerID": $scope.addModal.AnswerID,
                "AnswerContent": $scope.addModal.AnswerContent,
                "AnswerPath": '',
                "QuestionID": $scope.curDataFilter[index].QuestionID
            }

            apiService.post('Answer/' + $scope.curDataFilter[index].QuestionID, answer, function (result) {
                if ($scope.showSingle == true) {
                    $scope.answerData.push(answer);
                }
                $scope.answerData2.push(answer);
                alert('Câu trả lời đã được thêm')
                //clear search field
                $scope.addModal.AnswerContent = null;
            }, function (erro) {
                alert('Lỗi postAPI');
            });
        }
        ////EDIT
        $scope.editAnswer = function (item) {
            $scope.updateAnswer.QuestionID = item.QuestionID;
            $scope.updateAnswer.AnswerID = item.AnswerID;
            $scope.updateAnswer.AnswerContent = item.AnswerContent;
        }
        ////UPDATE
        $scope.updateAnswer = function (item) {
            var answer = {
                "QuestionID": $scope.updateAnswer.QuestionID,
                "AnswerID": $scope.updateAnswer.AnswerID,
                "AnswerContent": item.AnswerContent,
                "AnswerPath" : '',
            }
            apiService.put('Answer/' + item.QuestionID + '/' + item.AnswerID, answer, function (result) {
                var edited = document.getElementById($scope.updateAnswer.AnswerID);
                alert(edited.value);
                edited.innerHTML = item.AnswerContent;
                $("#" + $scope.updateAnswer.AnswerID).val(item.AnswerContent);
                alert('Câu trả lời đã được cập nhật');
            }, function (erro) {
                alert('Lỗi postAPI');
            })
        }

        $scope.removeAnswer = function (item, index) {
            var name = item.AnswerContent;
            if (confirm("Bạn có muốn xóa: " + name)) {
                apiService.del('Answer/' + item.QuestionID + '/' + item.AnswerID, null, function (result) {

                    //Remove the item from Array using Index.
                    if ($scope.showSingle) {
                        $scope.answerData.splice(index, 1);

                    }
                    $scope.answerData2.splice(index, 1);
                    alert('Câu trả lời đã được xóa');
                }, function (erro) {
                    alert('Lỗi delAPI');
                })
            }
        }

        $scope.showQuestion = function () {
            $scope.showSingle = false;
        }


        function getData() {
            //GET QUESTION
            apiService.get('Course_Exercise/' + $state.params.courseID, null, function (result) {
                $scope.curDataFilter = [];

                result.data[0].forEach(function (element) {
                    $scope.curDataFilter.push(element);
                });
                $scope.questionData = $scope.curDataFilter;
            }, function (erro) {
                alert('Lỗi getAPI');
                });
        }

        var checkToken = localStorageService.get("TokenInfo");
        $scope.UserLevel = localStorageService.get("UserLevel");
        if (checkToken && $scope.UserLevel == 2) {
            getData();
        }
        else {
            window.location.href = 'http://localhost:2697/#!/login'
        }

    }
})(angular.module('ocms.student_exercise'));