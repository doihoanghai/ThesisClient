(function (app) {
    app.controller('do_exerciseController', do_exerciseController);

    do_exerciseController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService'];



    function do_exerciseController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService) {
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
        $scope.mangCauHoi = [{ data: 'Câu 1' }, { data: 'Câu 1' }, { data: 'Câu 1' }, { data: 'Câu 1' }, { data: 'Câu 1' }, { data: 'Câu 1' }, { data: 'Câu 1' }, { data: 'Câu 1' }, { data: 'Câu 1' }, { data: 'Câu 1' },]
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
                $scope.listLength = $scope.curDataFilter.length - 1;
                result.data[0].forEach(function (element) {
                    $scope.addModal.AnswerContent = element.AnswerContent;
                    if ($scope.curDataFilter[CurQuestion].QuestionType == 1) {
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
        $scope.clickBackNext = function (element) {
            $scope.testDate23 = element.currentTarget.value; // this will return the value of the button
            
            if ($scope.testDate23 == 'next') {
                $scope.CurQuestion *= 1;
                $scope.CurQuestion += 1;
                $scope.getAnswer($scope.CurQuestion);
            }
            if ($scope.testDate23 == 'back') {
                $scope.CurQuestion *= 1;
                $scope.CurQuestion -= 1;
                $scope.getAnswer($scope.CurQuestion);
            }
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


        function getData() {
            //GET QUESTION
            apiService.get('Question/', null, function (result) {
                $scope.curDataFilter = [];

                result.data[0].forEach(function (element) {
                    $scope.curDataFilter.push(element);
                });
                $scope.questionData = $scope.curDataFilter;
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

        getData();;

    }
})(angular.module('ocms.do_exercise'));