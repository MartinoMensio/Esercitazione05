var app = angular.module('App');

app.controller('MainCtrl', ['$scope', '$routeParams', '$location', 'leafletData', 'DataProvider',
    function ($scope, $routeParams, $location, leafletData,  DataProvider) {
        var lineId = $routeParams.lineId;
        this.lines = DataProvider.getLines();

        this.center = {
            lat: 45.064,
            lng: 7.681,
            zoom: 13
        }

        if (lineId) {
            this.data = DataProvider.getLineByIdAsGeoJson(lineId);
            var data = this.data;

            leafletData.getMap().then(function(map) {
                map.fitBounds(data.latlngs);
            });
        }

        this.showLine = function(lineId) {
            $location.path(lineId);
        }
    }
]);