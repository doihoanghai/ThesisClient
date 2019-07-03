(function (app) {
    app.controller('do_exerciseController', do_exerciseController);

    do_exerciseController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService', 'localStorageService'];



    function do_exerciseController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService, localStorageService) {
        $scope.CurQuestion = {};
        $scope.cauhoi = {};
        $scope.updateModal = {};
        $scope.updateAnswer = {};
        $scope.addModal = {};
        $scope.testDate23 = {};
        $scope.questionData = {};
        $scope.answerData = {};
        $scope.answerData2 = {};
        $scope.showSingle = true;
        //Answer//
        //Load Answer Each
        $scope.val = function () {
            $scope.qIndex = document.getElementById("question").value;
            $scope.showSingle = true;
            $scope.getAnswer($scope.qIndex);
        }
        $scope.getAnswer = function (index) {
            //GET ANSWER EACH
            $scope.answerData = [];
            apiService.get('Answer/' + $scope.curDataFilter[index].QuestionID, null, function (result) {
                //$scope.qIndex = $scope.curDataFilter[$scope.qIndex].QuestionID;
                $scope.listLength = $scope.curDataFilter.length - 1;
                result.data[0].forEach(function (element) {
                    $scope.answerData.push(element);
                });

            }, function (erro) {
                alert('Lỗi getAPI');
                });
            apiService.get('StudentAnswer/' + $scope.curDataFilter[index].QuestionID, null, function (result) {
                //$scope.qIndex = $scope.curDataFilter[$scope.qIndex].QuestionID;
                //$scope.listLength = $scope.curDataFilter.length - 1;
                result.data[0].forEach(function (element) {
                    $scope.addModal.AnswerContent = element.AnswerContent;
                    if ($scope.curDataFilter[index].QuestionType == 1) {
                        $scope.chosen = element.AnswerID;
                    }
                });

            }, function (erro) {
                alert('Lỗi getAPI');
                });
            $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                //you also get the actual event object
                //do stuff, execute functions -- whatever...
                for (var j = 0; j < $scope.answerData.length; j++) {
                    if ($scope.curDataFilter[$scope.qIndex].AnswerID == $scope.chosen) {
                        var answerID = "answer" + j;
                        var ao = document.getElementById(answerID);
                        $('#' + answerID).prop('checked', true);
                        //var radioButton = document.getElementById(answerID);
                        //radioButton.checked = true;
                    }
                }
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
        ///CHOOSE 
        $scope.chooseAnswer = function (question, answer) {
            var dapan = {
                "AnswerContent": answer.AnswerContent,
                "QuestionType": question.QuestionType,
                "QuestionTime": question.QuestionTime,
                "Score": question.Score,
                "AnswerID": answer.AnswerID,
                "ExerciseID": $state.params.exerciseID,
            }
            apiService.put('StudentAnswer/' + question.QuestionID, dapan, function () {
                alert('Câu trả lời ' + answer.AnswerContent + ' đã được chọn là đáp án');
                answer.AnswerContent = '';
            }, function (erro) {
                alert('Lỗi postAPI');
            });
        }
        //Question Button
        $scope.clickQuestion = function (index) {
            $scope.currentIndex = index;
            document.getElementById('socau').innerHTML = index+1;
            $scope.curQuestType = $scope.curDataFilter[index].QuestionType;
            document.getElementById('debai').innerHTML = $scope.curDataFilter[index].QuestionContent;
            $scope.getAnswer(index);
            apiService.get('StudentAnswer/' + $scope.curDataFilter[index].QuestionID, null, function (result) {
                //$scope.qIndex = $scope.curDataFilter[$scope.qIndex].QuestionID;
                //$scope.listLength = $scope.curDataFilter.length - 1;
                result.data[0].forEach(function (element) {
                    $scope.addModal.AnswerContent = element.AnswerContent;
                    if ($scope.curDataFilter[index].QuestionType == 1) {
                        $scope.chosen = element.AnswerID;
                    }
                });

            }, function (erro) {
                alert('Lỗi getAPI');
            });
            $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                //you also get the actual event object
                //do stuff, execute functions -- whatever...
                for (var j = 0; j < $scope.answerData.length; j++) {
                    if ($scope.curDataFilter[index].AnswerID == $scope.chosen) {
                        var answerID = "answer" + j;
                        var ao = document.getElementById(answerID);
                        $('#' + answerID).prop('checked', true);
                        //var radioButton = document.getElementById(answerID);
                        //radioButton.checked = true;
                    }
                }
            });
        }
        //Back Next Button
        $scope.clickBackNext = function (event) {
            if (event.currentTarget.value == 'next') {
                $scope.currentIndex += 1;
                document.getElementById('socau').innerHTML = $scope.currentIndex + 1;
                document.getElementById('debai').innerHTML = $scope.questionData[$scope.currentIndex].QuestionContent;
                $scope.curQuestType = $scope.curDataFilter[$scope.currentIndex].QuestionType;
                $scope.getAnswer($scope.currentIndex);
            }
            if (event.currentTarget.value == 'back') {
                $scope.currentIndex -= 1;
                document.getElementById('socau').innerHTML = $scope.currentIndex + 1;
                document.getElementById('debai').innerHTML = $scope.questionData[$scope.currentIndex].QuestionContent;
                $scope.curQuestType = $scope.curDataFilter[$scope.currentIndex].QuestionType;
                $scope.getAnswer($scope.currentIndex);
            }
        }
        function getData() {
            //GET QUESTION
            apiService.get('Question/', null, function (result) {
                $scope.curDataFilter = [];
                result.data[0].forEach(function (element) {
                    $scope.curDataFilter.push(element);
                });
                $scope.questionData = $scope.curDataFilter;

                document.getElementById('socau').innerHTML = 1;
                document.getElementById('debai').innerHTML = $scope.questionData[0].QuestionContent;
                $scope.curQuestType = $scope.curDataFilter[0].QuestionType;
                $scope.currentIndex = 0;
                $scope.getAnswer(0);
            }, function (erro) {
                alert('Lỗi getAPI');
                });

            //GET ALL ANSWER
            apiService.get('Answer/' + $state.params.exerciseID, null, function (result) {
                $scope.answerData2 = [];

                result.data[0].forEach(function (element) {
                    $scope.answerData2.push(element);
                });
            }, function (erro) {
                alert('Lỗi getAPI');
                });

            apiService.get('StudentExercise/start/' + $state.params.exerciseID, null, function (result) {

            }, function (erro) {
                alert('Lỗi getAPI');
            });
        }
        var checkToken = localStorageService.get("TokenInfo");
        $scope.UserLevel = localStorageService.get("UserLevel");
        if (checkToken && $scope.UserLevel==2) {
            getData();
        }
        else {
            window.location.href = 'http://localhost:2697/#!/login'
        }

    }
})(angular.module('ocms.do_exercise'));