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


	$scope.eventDetected = "No events yet...";
	var mapEvents = leafletMapEvents.getAvailableMapEvents();
	for (var k in mapEvents){
		var eventName = 'leafletDirectiveMap.' + mapEvents[k];
		$scope.$on(eventName, function(event){
			$scope.eventDetected = event.name;
		});

	}

	$scope.$on("leafletDirectiveMap.click", function(event, args){
		var leafEvent = args.leafletEvent;
		$scope.addSoruceMarker(leafEvent);
	});

	$scope.addSoruceMarker = function(leafEvent) {
		angular.extend($scope, {
			markers: {
				src: {
					lat: leafEvent.latlng.lat,
					lng: leafEvent.latlng.lng,
					message: "I'm a static marker",
				},
			}
		});
	};

	$scope.addDestinationMarker = function() {
		angular.extend($scope, {
			markers: {
				dst: {
					lat: 51.505,
					lng: -0.09,
					message: "I'm a static marker",
				},
			}
		});
	};

} ]);
