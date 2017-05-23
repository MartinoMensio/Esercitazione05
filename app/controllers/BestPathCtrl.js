var app = angular.module('App');

app.controller('BestPathCtrl', ['$scope', '$routeParams', '$location', 'leafletData', 'DataProvider',
function ($scope, $routeParams, $location, leafletData,  DataProvider) {

	angular.extend($scope, {
		center: {
			lat: 45.064,
			lng: 7.681,
			zoom: 13
		},

		markers: {
			m1: {
				lat: 45.064,
				lng: 7.681,
				message: "I'm the center of Turin",
				draggable : true
			},
		},

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
