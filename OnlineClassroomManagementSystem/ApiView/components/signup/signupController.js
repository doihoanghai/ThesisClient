(function (app) {
    app.controller('signupController', signupController);

    signupController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService'];

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


    function signupController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService) {
        $scope.signupRole = 1;
        $scope.signupData = {};
        $(".exercise").change(function () {
            var val = $('.exercise:checked').val();//view by
            if (val == 'teacher') {
                $scope.signupRole = 1;
            }
            if (val == 'student') {
                $scope.signupRole = 2;
            }
        }
        );
        
        $scope.signUp = function () {
            if (!$scope.signupData.userName) {
                alert('Chưa nhập tên đăng nhập');
                return
            }
            if ($scope.signupData.userName.length<7) {
                alert('Tên đăng nhập phải nhiều hơn 6 kí tự');
                return
            }
            if (!$scope.signupData.password) {
                alert('Chưa nhập mật khẩu đăng nhập');
                return
            }
            if ($scope.signupData.password.length<9) {
                alert('Mật khẩu đăng nhập phải nhiều hơn 8 kí tự');
                return
            }
            if (!$scope.signupData.password2) {
                alert('Chưa nhập lại mật khẩu đăng nhập');
                return
            }
            if ($scope.signupData.password != $scope.signupData.password2) {
                alert('Mật khẩu chưa trùng khớp');
                return
            }
            if ($scope.signupData.password == $scope.signupData.password2) {
                var signup = {
                    "UserName": $scope.signupData.userName,
                    "Password": $scope.signupData.password,
                    "UserLevel": $scope.signupRole
                }
            }
            apiService.post('signup', signup, function (result) {
                alert('Đăng ký thành công dưới tên đăng nhập: ' + $scope.signupData.userName);
            },
                function (erro) {
                    alert('Lỗi postAPI');
                    return;
                });

        }
    }
})(angular.module('ocms.signup'));