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
			m1: {
				lat: 45.064,
				lng: 7.681,
				focus: true,
				message: "I'm the center of Turin",
				draggable : true
			},
		},
		events: {
			map: {
				enable: ['click', 'drag', 'blur', 'touchstart'],
				logic: 'emit'
			}
		},

	});

	$scope.$on("leafletDirectiveMarker.dragend", function(event, args){
			   $scope.position.lat = args.model.lat;
			   $scope.position.lng = args.model.lng;
		   });

	/* COME CAZZO E' POSSIBILE CHE QUELLO SOPRA VA E QUESTO NO? */
	/* nell'html ho sostituito lf-center="ctrl.center" con l'attributo center="center" */
	/*this.center = {
	lat: 44.064,
	lng: 7.681,
	zoom: 13
}

markers: {
m1: {
lat: 44.064,
lng: 7.681,
message: "I'm the center of Turin",
}
}
*/
/* center variable describes the starting point on the map to be visualized */



}]);
