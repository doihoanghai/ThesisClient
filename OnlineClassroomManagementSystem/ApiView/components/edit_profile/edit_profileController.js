(function (app) {
    app.controller('edit_profileController', edit_profileController);

    edit_profileController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService'];

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


    function edit_profileController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService) {
        $scope.profileData = {};
        apiService.get('GetProfile', null, function (result) {
            alert(result.data[0]);
            $scope.profileData.FullName = result.data[0][0].FullName;
            $scope.profileData.Address = result.data[0][0].Address;
            $scope.profileData.BirthDay = result.data[0][0].BirthDay;
            $scope.profileData.Email = result.data[0][0].Email;
            $scope.profileData.PhoneNumber = result.data[0][0].PhoneNumber;
        }, function (erro) {
            alert('lỗi getApi');
        });
        $scope.updateProfile = function () {
            if (!$scope.profileData.password0) {
                alert('Chưa nhập mật khẩu đăng nhập hiện tại');
                return
            }
            if (!$scope.profileData.password1) {
                alert('Chưa nhập mật khẩu đăng nhập mới');
                return
            }
            if ($scope.profileData.password1.length < 9) {
                alert('Mật khẩu đăng nhập phải nhiều hơn 8 kí tự');
                return
            }
            if (!$scope.profileData.password2) {
                alert('Chưa nhập lại mật khẩu đăng nhập mới');
                return
            }
            if ($scope.profileData.password1 != $scope.profileData.password2) {
                alert('Xác nhận mật khẩu mới chưa trùng khớp');
                return
            }

            var password = {
                    "Password": $scope.profileData.password2
            }

            apiService.post('changePassword', password, function (result) {
                alert($scope.password);
            },
                function (erro) {
                    alert('Lỗi postAPI');
                });

        }
    }
})(angular.module('ocms.edit_profile'));