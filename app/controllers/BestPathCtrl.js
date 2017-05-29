var app = angular.module('App');

app.controller('BestPathCtrl', ['$scope', "leafletMapEvents", '$routeParams', '$location', 'leafletData', 'DataProvider', 'MinPathProvider', 'GeocodingService',
    function ($scope, leafletMapEvents, $routeParams, $location, leafletData, DataProvider, MinPathProvider, GeocodingService) {

        angular.extend($scope, leafletMapEvents, {
            center: {
                lat: 45.064,
                lng: 7.681,
                zoom: 13
            },
            defaults: {
                scrollWheelZoom: false
            },
            markers: {
            },
            events: {
                map: {
                    enable: ['zoomstart', 'drag', 'click', 'mousemove'],
                    logic: 'emit'
                }
            },
            legend: {
                position: 'bottomleft',
                colors: ['#ff0000', '#28c9ff', '#0000ff', '#ecf386'],
                labels: ['National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway']
            },
        });

        $scope.$on("leafletDirectiveMap.click", function (event, args) {
            if (Object.keys($scope.markers).length < 2) {
                var key = Object.keys($scope.markers).length == 0 ? 'source' : 'destination';
                var leafEvent = args.leafletEvent;
                $scope.markers[key] = {
                    lat: leafEvent.latlng.lat,
                    lng: leafEvent.latlng.lng,
                    message: key,
                    draggable: true
                };
                $scope[key + 'Str'] = 'set on map';
            }
        });

        $scope.$on("leafletDirectiveMarker.dragend", function (event, args) {
            console.log('hola');
            // already updated!!
            //$scope.markers[0].lat = args.model.lat;
            //$scope.markers[0].lng = args.model.lng;
        });

        $scope.removeMarkers = function () {
            $scope.markers = {};
            $scope.geojson = [];
        }

        $scope.findPath = function () {
            var source = $scope.markers['source'];
            var destination = $scope.markers['destination'];
            if (source && destination) {
                MinPathProvider.getMinPathBetween(source, destination, true).then(function (result) {
                    $scope.geojson = result.geojson;
                    $scope.markers = result.markers;
                });
            }
        }

        $scope.geocodeSrc = function() {
            GeocodingService.getLocationFromString($scope.sourceStr).then(function(result) {
                $scope.markers['source'] = result.geometry.location;
            })
        }

        $scope.geocodeDst = function() {
            GeocodingService.getLocationFromString($scope.destinationStr).then(function(result) {
                $scope.markers['destination'] = result.geometry.location;
            })
        }
    }
]);
