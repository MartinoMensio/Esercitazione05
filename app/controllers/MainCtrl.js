var app = angular.module('App');

app.controller('MainCtrl', ['$scope', 'leafletData', 'DataProvider', '$stateParams',
    function ($scope, leafletData,  DataProvider, $stateParams) {
        var lineId =  $stateParams.lineId;
        this.lines = DataProvider.getLines();

        if (lineId) {
            this.data = DataProvider.getLineByIdAsGeoJson(lineId);
            var data = this.data;

            leafletData.getMap().then(function(map) {
                map.fitBounds(data.latlngs);
            });
        }

        // define the map centering
        this.center = { 
            lat: 45.064, 
            lng: 7.681, 
            zoom: 13
        }

        // variable that controls the visualization of the whole list
        this.showList = false;

        // control wether it is necessary to show or not the whole list
        this.showAll = function() {
            this.searchText = "";

            if (this.showList == true) {
                this.showList = false;
            }
            else {
                this.showList = true;
            }
        }

        // control wether it is necessary to show or not the list when search text is written
        this.showResult = function() {
            if (this.searchText != "")
                this.showList = true;
            else {
                this.showList = false;
            }
        }
    }
]);