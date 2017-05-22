var app = angular.module('App');

app.controller('MainCtrl', ['$scope', 'DataProvider',
    function ($scope, DataProvider) {
        this.lines = DataProvider.getLines();
        this.geojson = DataProvider.geojson();
    }
]);