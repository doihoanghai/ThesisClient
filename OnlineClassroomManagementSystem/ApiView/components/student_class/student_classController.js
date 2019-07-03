(function (app) {
    app.controller('student_classController', student_classController);

    student_classController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService', 'localStorageService'];



    function student_classController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService, localStorageService) {
        
        $scope.updateModal = {};
        $scope.addModal = {};
        $scope.UserLevel = {};

        $scope.joinClass = function () {
            apiService.get('Class_Student/ActiveCode/' + $scope.updateModal.ClassCode, null, function (result) {
                alert(' đã được thêm vào lớp');
            },
                function (erro) {
                    alert('Lỗi getAPI');
                });
            $scope.updateModal.ClassCode = '';
        }

        function getData() {
            //GET CLASS
            apiService.get('Class_Student/GetOwnClass', null, function (result) {
                $scope.curDataFilter = [];

                result.data[0].forEach(function (element) {
                    //GET TEACHER
                    apiService.get('Class_Teacher/' + element.ClassID, null, function (result) {

                        result.data[0].forEach(function (teacher) {
                            var item = { "CourseID": element.CourseID, "ClassID": element.ClassID, "ClassName": element.ClassName, "FullName": teacher.FullName };
                            $scope.curDataFilter.push(item);
                        });
                    }, function (erro) {
                        alert('Lỗi get teacher');
                    });
                });
            }, function (erro) {
                alert('Lỗi get class');
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
})(angular.module('ocms.student_class'));