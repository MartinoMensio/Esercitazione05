var app = angular.module('App');

app.controller('BestPathCtrl', ['$scope', "leafletMapEvents",'$routeParams', '$location', 'leafletData', 'DataProvider', 'MinPathProvider',
function ($scope, leafletMapEvents, $routeParams, $location, leafletData,  DataProvider, MinPathProvider) {

	angular.extend($scope,leafletMapEvents, {
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
		}
	});

	$scope.markers = new Array();

	$scope.$on("leafletDirectiveMap.click", function(event, args){
		if($scope.markers.length<2){
       var leafEvent = args.leafletEvent;
       $scope.markers.push({
           lat: leafEvent.latlng.lat,
           lng: leafEvent.latlng.lng,
           message: "Point " +($scope.markers.length+1),
		   draggable: true
       });
	   }
   });

   $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
                console.log('hola');
                $scope.markers[0].lat = args.model.lat;
                $scope.markers[0].lng = args.model.lng;
            });

   $scope.removeMarkers = function() {
	   $scope.markers = new Array();
   }

   $scope.findPath = function() {
	MinPathProvider.getMinPathBetween($scope.markers[0], $scope.markers[1], true).then(function(result) {
		$scope.geojson = result.geojson;
		$scope.markers = result.markers;
	})
   }

} ]);
