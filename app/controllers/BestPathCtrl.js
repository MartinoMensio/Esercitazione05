var app = angular.module('App');

app.controller('BestPathCtrl', ['$scope', "leafletMapEvents",'$routeParams', '$location', 'leafletData', 'DataProvider',
function ($scope, leafletMapEvents, $routeParams, $location, leafletData,  DataProvider) {

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

	$scope.eventDetected = "No events yet...";
	var mapEvents = leafletMapEvents.getAvailableMapEvents();
	for (var k in mapEvents){
		var eventName = 'leafletDirectiveMap.' + mapEvents[k];
		$scope.$on(eventName, function(event){
			$scope.eventDetected = event.name;
		});

	}

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

   $scope.removeMarkers = function() {
	   $scope.markers = new Array();
   }

} ]);
