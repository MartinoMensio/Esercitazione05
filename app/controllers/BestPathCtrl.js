var app = angular.module('App');

app.controller('BestPathCtrl', ['$scope', "leafletData", '$routeParams', '$location', 'MinPathProvider', 'GeocodingService',
    function ($scope, leafletData, $routeParams, $location, MinPathProvider, GeocodingService) {

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
            colors: ['#0064c8', '#ff6400'],
            labels: ['Walk', 'Bus']
        };
        this.tiles = {
            name: 'MapBox',
            url: '//api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
            type: 'xyz'
        };

        // define the map centering
        this.center = {
            lat: 45.064,
            lng: 7.681,
            zoom: 13
        }

        // handle user adding a marker
        $scope.$on("leafletDirectiveMap.click", (event, args) => {
            // check how many markers are there on the map
            if (Object.keys(this.markers).length < 2) {
                // decide if this is the source (first marker) or the destination (second marker)
                var key = Object.keys(this.markers).length == 0 ? 'source' : 'destination';
                var leafEvent = args.leafletEvent;
                // build the marker
                this.markers[key] = {
                    lat: leafEvent.latlng.lat,
                    lng: leafEvent.latlng.lng,
                    message: key,
                    draggable: true
                };
                // update the search form
                this[key + 'Str'] = 'set on map';
            }
        });

        this.removeMarkers = () => {
            this.markers = {};
            this.geojson = [];
            this.sourceStr = '';
            this.destinationStr = '';
        }

        // use the service to get the suggested path
        this.findPath = () => {
            var source = this.markers['source'];
            var destination = this.markers['destination'];
            if (source && destination) {
                MinPathProvider.getMinPathBetween(source, destination, true).then((result) => {
                    this.geojson = result.geojson;
                    this.markers = result.markers;
                    leafletData.getMap().then(function (map) {
                        map.fitBounds(result.latlngs);
                    });
                });
            }
        }

        this.geocodeSrc = () => {
            GeocodingService.getLocationFromString(this.sourceStr).then((result) => {
                this.markers['source'] = result.geometry.location;
            })
        }

        this.geocodeDst = () => {
            GeocodingService.getLocationFromString(this.destinationStr).then((result) => {
                this.markers['destination'] = result.geometry.location;
            })
        }
    }
]);
