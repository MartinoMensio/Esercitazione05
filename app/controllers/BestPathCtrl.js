var app = angular.module('App');

app.controller('BestPathCtrl', ['$scope', '$routeParams', '$location', 'leafletData', 'DataProvider',
function ($scope, $routeParams, $location, leafletData,  DataProvider) {

	angular.extend($scope, {
		center: {
			lat: 45.064,
			lng: 7.681,
			zoom: 13
		},
		defaults: {
            scrollWheelZoom: false
        },
		markers: {
			src: {
				lat: 45.064,
				lng: 7.685,
				focus: true,
				message: "I'm the path source",
				draggable : true
			},
			dst: {
				lat: 45.064,
				lng: 7.681,
				focus: true,
				message: "I'm the path destination",
				draggable : true
			}
		},
		events: {
			/*map: {
				enable: ['click', 'drag', 'blur', 'touchstart'],
				logic: 'emit'
			}*/
		}


	});
	/*
	$scope.markers = new Array();

	$scope.$on("leafletDirectiveMap.click", function(event, args){
		var leafEvent = args.leafletEvent;

			   $scope.markers.push({
							 lat: leafEvent.latlng.lat,
							 lng: leafEvent.latlng.lng,
							 message: "My Added Marker"
				});

	});

/*	$scope.$on("leafletDirectiveMarker.dragend", function(event, args){
			   $scope.position.lat = args.model.lat;
			   $scope.position.lng = args.model.lng;


		   });*/




} ]);
