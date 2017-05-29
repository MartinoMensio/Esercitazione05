var app = angular.module('App');

app.controller('BestPathCtrl', ['$scope', "leafletMapEvents", '$routeParams', '$location', 'MinPathProvider', 'GeocodingService',
    function ($scope, leafletMapEvents, $routeParams, $location, MinPathProvider, GeocodingService) {
        // save reference to the controller for functions that execute out of scope
        var self = this;

        // initialize the map
        this.center = {
            lat: 45.064,
            lng: 7.681,
            zoom: 13
        };
        this.defaults = {
            scrollWheelZoom: false
        };
        this.markers = {};
        this.events = {
            map: {
                enable: ['zoomstart', 'drag', 'click', 'mousemove'],
                logic: 'emit'
            }
        };
        this.legend = {
            position: 'bottomleft',
            colors: ['#ff0000', '#28c9ff', '#0000ff', '#ecf386'],
            labels: ['National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway']
        };

        // handle user adding a marker
        $scope.$on("leafletDirectiveMap.click", function (event, args) {
            // check how many markers are there on the map
            if (Object.keys(self.markers).length < 2) {
                // decide if this is the source (first marker) or the destination (second marker)
                var key = Object.keys(self.markers).length == 0 ? 'source' : 'destination';
                var leafEvent = args.leafletEvent;
                // build the marker
                self.markers[key] = {
                    lat: leafEvent.latlng.lat,
                    lng: leafEvent.latlng.lng,
                    message: key,
                    draggable: true
                };
                // update the search form
                self[key + 'Str'] = 'set on map';
            }
        });

        $scope.$on("leafletDirectiveMarker.dragend", function (event, args) {
            console.log('hola');
            // already updated!!
            //$scope.markers[0].lat = args.model.lat;
            //$scope.markers[0].lng = args.model.lng;
        });

        this.removeMarkers = function () {
            self.markers = {};
            self.geojson = [];
            self.sourceStr = '';
            self.destinationStr = '';
        }

        // use the service to get the suggested path
        this.findPath = function () {
            var source = self.markers['source'];
            var destination = self.markers['destination'];
            if (source && destination) {
                MinPathProvider.getMinPathBetween(source, destination, true).then(function (result) {
                    self.geojson = result.geojson;
                    self.markers = result.markers;
                });
            }
        }

        this.geocodeSrc = function () {
            GeocodingService.getLocationFromString(self.sourceStr).then(function (result) {
                self.markers['source'] = result.geometry.location;
            })
        }

        this.geocodeDst = function () {
            GeocodingService.getLocationFromString(self.destinationStr).then(function (result) {
                self.markers['destination'] = result.geometry.location;
            })
        }
    }
]);
