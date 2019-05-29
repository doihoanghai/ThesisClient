(function (app) {
    'use strict';
    app.factory('authData', [function () {
        var authDataFactory = {};

        var authentication = {
            IsAuthenticated: false,
            userName: "",
            fullName: "",
            timeToken: new Date()
        };
        authDataFactory.authenticationData = authentication;

        return authDataFactory;
    }]);
})(angular.module('ocms.common'));
