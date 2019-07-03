var xml = new XMLHttpRequest();
xml.open('GET', 'Scripts/XML/ClinicInfo.xml', false)
xml.send();
var xmlData = xml.responseXML;
var host;
xmlData = (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
var clinic = xmlData.getElementsByTagName("clinic");
hostapi = clinic[0].getElementsByTagName("host")[0].firstChild.data;
(function (app) {
    app.factory('apiService', apiService);

    apiService.$inject = ['$http', 'notificationService', 'authenticationService', '$state', '$location', 'authData'];
    var apihost = hostapi;
    function apiService($http, notificationService, authenticationService, $state, $location, authData) {     
        return {
            get: get,
            post: post,
            put: put,
            del: del,
            apihost : apihost
        }
        function del(url, data, success, failure) {
            authenticationService.setHeader();

            $http.delete(apihost + url, data).then(function (result) {
                
                success(result);
            }, function (error) {
                console.log(error.status)
                if (error.status === 401) {

                    if (authData.authenticationData.IsAuthenticated == true) {
                        $location.path('/error');
                    } else {
                        notificationService.displayError('Authenticate is required.');
                        $location.path('/login');
                    }
                }

            });
        }
        function post(url, data, success, failure) {
            authenticationService.setHeader();
            $http.post(apihost + url, data).then(function (result) {
                success(result);
            }, function (error) {
                console.log(error.status)
                if (error.status === 401) {
                    if (authData.authenticationData.IsAuthenticated == true) {
                        $location.path('/error');
                       
                        notificationService.displayError('Authenticate is required.');

                    } else {
                       
                        notificationService.displayError('Authenticate is required.');
                        $location.path('/login');
                    }
                }
                else if (failure != null) {
                    failure(error);
                }
            });
            
        }

        function put(url, data, success, failure) {
            authenticationService.setHeader();
            $http.put(apihost + url, data).then(function (result) {
                success(result);
            }, function (error) {
                console.log(error.status)
                if (error.status === 401) {
                    if (authData.authenticationData.IsAuthenticated == true) {
                        $location.path('/error');
                        notificationService.displayError('Authenticate is required.');

                    } else {
                        notificationService.displayError('Authenticate is required.');
                        $location.path('/login');
                    }
                }
                else if (failure != null) {
                    failure(error);
                }
            });
        }
        function get(url, params, success, failure) {
         
            authenticationService.setHeader();
            
            $http.get(apihost + url, params).then(function (result) {
                success(result);

           }, function (error) {
                console.log(error.status)
                if (error.status === 401) {
                    var dateToken = new Date(authData.authenticationData.timeToken);
                    var dateNow = new Date();
                    if (authData.authenticationData.IsAuthenticated == true) {
                        if (dateToken <= dateNow) {
                            notificationService.displayError('Hết hạn sử dụng, mời đăng nhập lại.');
                        } else {
                            $location.path('/error');
                        }
                    } else {
                        notificationService.displayError('Authenticate is required.');
                        $location.path('/login');
                    }
                }
                else if (failure != null) {
                    failure(error);
                }
            });
            //function get(url, params, success, failure) {
            //    authenticationService.setHeader();
            //    $http({
            //        method: 'GET',
            //        url: apihost+url,
            //        params : params
            //    }).then(function (result) {
            //        success(result);
            //    }, function (error) {
            //        console.log(error.status)
            //        if (error.status === 401) {
            //            var dateToken = new Date(authData.authenticationData.timeToken);
            //            var dateNow = new Date();
            //            if (authData.authenticationData.IsAuthenticated == true && authData.authenticationData.userName != '') {
            //                if (dateToken <= dateNow) {
            //                    notificationService.displayError('Hết hạn sử dụng, mời đăng nhập lại.');
            //                } else {
            //                    $location.path('/error');
            //                }
            //            } else {
            //                notificationService.displayError('Authenticate is required.');
            //            }
            //        }
            //        else if (failure != null) {
            //            failure(error);
            //        }
            //    });
        }
    }
})(angular.module('ocms.common'));