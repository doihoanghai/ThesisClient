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
            //GET QUESTION ANSWER
            apiService.get('Answer/' + $scope.curDataFilter[index].QuestionID, null, function (result) {
                //$scope.qIndex = $scope.curDataFilter[$scope.qIndex].QuestionID;
                $scope.listLength = $scope.curDataFilter.length - 1;
                result.data[0].forEach(function (element) {
                    $scope.answerData.push(element);
                });

            }, function (erro) {
                alert('Lỗi getAPI');
                });
            //GET STUDENT ANSWER
            apiService.get('StudentAnswer/getOwnAnswer/' + $scope.curDataFilter[index].QuestionID, null, function (result) {
                //$scope.qIndex = $scope.curDataFilter[$scope.qIndex].QuestionID;
                //$scope.listLength = $scope.curDataFilter.length - 1;
                result.data[0].forEach(function (element) {
                    $scope.addModal.AnswerContent = element.AnswerContent;
                    if ($scope.curDataFilter[index].QuestionType == 1) {
                        $scope.chosen = element.AnswerID;
                    }
                    $('#' + element.AnswerID).prop('checked', true);
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
                
                $('#' + answer.AnswerID).prop('checked', true);
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
            apiService.get('StudentAnswer/getOwnAnswer/' + $scope.curDataFilter[index].QuestionID, null, function (result) {
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
            if ($scope.questionData[$scope.currentIndex].QuestionType == 2) {
                var dapan = {
                    "AnswerContent": $scope.addModal.AnswerContent,
                    "QuestionType": $scope.questionData[$scope.currentIndex].QuestionType,
                    "QuestionTime": $scope.questionData[$scope.currentIndex].QuestionTime,
                    "Score": $scope.questionData[$scope.currentIndex].Score,
                    "AnswerID": '',
                    "ExerciseID": $state.params.exerciseID,
                }
                apiService.put('StudentAnswer/' + $scope.questionData[$scope.currentIndex].QuestionID, dapan, function () {
                    $scope.addModal.AnswerContent = '';
                }, function (erro) {
                    alert('Lỗi postAPI');
                });
            }
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
        $scope.endExercise = function () {
            apiService.get('StudentExercise/end/' + $state.params.exerciseID, null, function (result) {},
                function (erro) {
                    alert('Lỗi endExercise');
                    return;
                });
        }
        function timer() {
            var m = 1;
            var date = new Date();
            const second = 1000,
                minute = second * 60,
                hour = minute * 60,
                day = hour * 24;

            let countDown = new Date(date.getTime() + m * 60000).getTime(),
                x = setInterval(function () {

                    let now = new Date().getTime(),
                        distance = countDown - now;

                    document.getElementById('hours').innerText =' < ' + Math.floor((distance % (day)) / (hour)) + ":",
                        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)) + ":",
                        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second) + ' > ';
                    if (distance < 0) {
                        clearInterval(x);
                        alert('Hết giờ làm bài');
                        $scope.endExercise();
                        $location.path('/student_class');
                    }
                    //do something later when date is reached
                    //if (distance < 0) {
                    //  clearInterval(x);
                    //  'IT'S MY BIRTHDAY!;
                    //}

                }, second)
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


            apiService.get('StudentExercise/start/' + $state.params.exerciseID, null, function (result) { },
                function (erro) {
                    alert('Lỗi startExercise');
                    return;
                });
        }
        var checkToken = localStorageService.get("TokenInfo");
        $scope.UserLevel = localStorageService.get("UserLevel");
        if (checkToken && $scope.UserLevel==2) {
            getData();
            timer();
        }
        else {
            window.location.href = 'http://localhost:2697/#!/login'
        }

    }
})(angular.module('ocms.do_exercise'));