(function (app) {
    app.controller('questionController', questionController);

    questionController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService'];



    function questionController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService) {
        $scope.CurQuestion = {};
        $scope.updateModal = {};
        $scope.addModal = {};
        $scope.questionData = {};
        $scope.answerData = {};
        $scope.answerData2 = {};
        $scope.showSingle = true;

        $scope.chooseAnswer = function () {
            var chon = $(".dapan:checked").val();
            alert(chon);
        }

            $scope.val = function () {
            $scope.qIndex = document.getElementById("question").value;
            $scope.showSingle = true;
            //GET ANSWER EACH
            $scope.answerData = [];
            apiService.get('Answer/' + $scope.curDataFilter[$scope.qIndex].QuestionID, null, function (result) {
                $scope.qIndex = $scope.curDataFilter[$scope.qIndex].QuestionID;
                result.data[0].forEach(function (element) {
                    $scope.answerData.push(element);
                });
            }, function (erro) {
                alert('Lỗi getAPI');
            });
        }
        $scope.addQuestion = function () {
            if (!$scope.addModal.QuestionContent) {
                alert("Nội dung câu hỏi còn thiếu");
                return
            }
            var qType = document.getElementById("questionType").options[document.getElementById("questionType").selectedIndex].value;

            if (!qType || qType == 0) {
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
            if (qType == 2) {
                $scope.addModal.AnswerID = '';
            }
            if (qType == 1 & !$scope.addModal.AnswerID) {
                $scope.addModal.AnswerID = '';
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
        $scope.addAnswer = function () {
            if (!$scope.addModal.AnswerContent) {
                alert("Nội dung câu trả lời còn thiếu");
                return
            }
            
            var answer = {
                "AnswerID": $scope.addModal.AnswerID,
                "AnswerContent": $scope.addModal.AnswerContent,
                "AnswerPath": '',
                "QuestionID": $scope.qIndex
            }

            apiService.post('Answer/' + $scope.qIndex, answer , function (result) {
                $scope.answerData.push(answer);
                $scope.answerData2.push(answer);
                alert('Câu trả lời đã được thêm')
                //clear search field
                $scope.addModal.AnswerContent = null;
            }, function (erro) {
                alert('Lỗi postAPI');
            });
        }
        $scope.removeQuestion= function (index) {
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
        $scope.editItem =
            $scope.editQuestion = function (index) {
                $scope.updateModal.QuestionContent = $scope.curDataFilter[index].QuestionContent;
                $scope.updateModal.QuestionType = $scope.curDataFilter[index].QuestionType;
                $scope.updateModal.QuestionTime = $scope.curDataFilter[index].QuestionTime;
                $scope.updateModal.Score = $scope.curDataFilter[index].Score;
            }

        $scope.showQuestion = function () {
            $scope.showSingle = false;
        }

        $scope.clickAnswer = function (question) {
            $scope.qIndex = question.QuestionID;
        }

        $scope.updateQuestion = function (edt, index) {

            if (edt.Score < 0) {
                alert("Điểm số câu hỏi phải >=0");
                return
            }
            if (edt.QuestionTime < 0) {
                alert("Thời gian trả lời phải >=0");
                return
            }
            var qType = document.getElementById("questionType").options[document.getElementById("questionType").selectedIndex].value;

            if (!qType || qType == 0) {
                alert("Chưa chọn loại câu hỏi");
                return
            }
            
            apiService.put('Question/' + $scope.curDataFilter[index].QuestionID, edt, function (result) {
                $scope.curDataFilter[index].QuestionContent = edt.QuestionContent;
                $scope.curDataFilter[index].QuestionType = edt.QuestionType;
                $scope.curDataFilter[index].QuestionTime = edt.QuestionTime;
                $scope.curDataFilter[index].Score = edt.Score;
                $scope.editItem[index] = false;
            }, function (erro) {
                alert('Lỗi putAPI');
            });
        }
;
        function getData() {
            //GET QUESTION
            apiService.get('ExerciseQ/' + $state.params.exerciseID, null, function (result) {
                $scope.curDataFilter = [];
                $scope.cauhoi = []

                result.data[0].forEach(function (element) {
                    $scope.curDataFilter.push(element);
                    $scope.cauhoi.push(element.QuestionID);
                });
                $scope.questionData = $scope.curDataFilter;
            }, function (erro) {
                alert('Lỗi getAPI');
                });

            //GET ALL ANSWER
            apiService.get('ExerciseAnswer/' + $state.params.exerciseID, null, function (result) {
                $scope.answerData2 = [];

                result.data[0].forEach(function (element) {
                    $scope.answerData2.push(element);
                });
            }, function (erro) {
                alert('Lỗi getAPI');
            });
        }

        getData();;

    }
})(angular.module('ocms.question'));