(function (app) {
    app.controller('chart_detailController', chart_detailController);

    chart_detailController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService', '$ngBootbox', 'apiService', 'notificationService', 'localStorageService'];

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


    function chart_detailController($state, authData, loginService, $scope, authenticationService, $ngBootbox, apiService, notificationService, localStorageService) {
        // Load google charts
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        // Draw the chart and set the chart values
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Thứ tự', 'Điểm'],
                ['1', 8],
                ['2', 2],
                ['3', 4],
                ['4', 2],
                ['5', 8],
                ['6', 8],
                ['7', 2],
                ['8', 4],
                ['9', 2],
            ]);

            // Optional; add a title and set the width and height of the chart
            var options = { 'title': 'Điểm bài tập', 'width': 550, 'height': 400 };

            // Display the chart inside the <div> element with id="piechart"
            var chart = new google.visualization.PieChart(document.getElementById('piechart'));
            chart.draw(data, options);
        }

    }
})(angular.module('ocms.chart_detail'));