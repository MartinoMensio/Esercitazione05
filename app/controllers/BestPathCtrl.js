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
			/*src: {
				lat: 45.064,
				lng: 7.685,
				focus: true,
				message: "I'm the path source",
				draggable : true
			},
			dst: {
				lat: 45.064,
				lng: 7.681,
				focus: false,
				message: "I'm the path destination",
				draggable : true
			}*/
		},
		events: {
			map: {
				enable: ['zoomstart', 'drag', 'click', 'mousemove'],
				logic: 'emit'
			}
		}
	});


	$scope.eventDetected = "No events yet...";
	var mapEvents = leafletMapEvents.getAvailableMapEvents();
	for (var k in mapEvents){
		var eventName = 'leafletDirectiveMap.' + mapEvents[k];
		$scope.$on(eventName, function(event){
			$scope.eventDetected = event.name;
		});
	}

	$scope.addMarkers = function() {
			 angular.extend($scope, {
				 markers: {
					 m1: {
						 lat: 45.068,
						 lng: 7.681,
						 message: "I'm a static marker",
						 draggable: true
					 }
				 }
			 });
		 };

	$scope.$on("leafletDirectiveMap.click", function(event, args){
		var leafEvent = args.leafletEvent;

		$scope.addMarkers();
	});

} ]);
