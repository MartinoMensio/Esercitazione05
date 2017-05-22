var app = angular.module('App');

app.controller('MainCtrl', ['$scope', '$routeParams', '$location', 'leafletBoundsHelpers', 'DataProvider',
    function ($scope, $routeParams, $location, leafletBoundsHelpers,  DataProvider) {
        var lineId = $routeParams.lineId;
        this.lines = DataProvider.getLines();

        this.center = {
            lat: 45.064,
            lng: 7.681,
            zoom: 13
        }

        if (lineId) {
            this.geojson = DataProvider.getLineByIdAsGeoJson(lineId);
            
            // TODO fit the map to the shown view
            //this.mapBounds = leafletBoundsHelpers.createBoundsFromArray(this.geojson);
        }

        this.showLine = function(lineId) {
            $location.path(lineId);
        }
    }
]);