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
        this.searchText = "";
        this.buttonText = "Show all"

        // control wether it is necessary to show or not the whole list
        this.showAll = function() {
            if (this.searchText.localeCompare("") != 0) {
                this.searchText = "";
                this.showList = true;
                this.buttonText = "Hide";
            }
            else {
                if (this.showList == true) {
                    this.showList = false;
                    this.buttonText = "Show all";
                }
                else {
                    this.showList = true;
                    this.buttonText = "Hide";
                }
            }
        }

        // control wether it is necessary to show or not the list when search text is written
        this.showResult = function() {
            if (this.searchText.localeCompare("") != 0) {
                this.showList = true;
                this.buttonText = "Show all";
            }
            else {
                this.showList = false;
                //this.buttonText = "Show all";
            }
        }
    }
]);