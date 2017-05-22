var app = angular.module('App');

app.controller('BestPathCtrl', ['$scope', '$routeParams', '$location', 'leafletData', 'DataProvider',
    function ($scope, $routeParams, $location, leafletData,  DataProvider) {
       $scope.welcomeMessage = 'Welcome user to the best path page!';
	   /*var lineId = $routeParams.lineId;*/
	   this.lines = DataProvider.getLines();

	   this.center = {
		   lat: 45.064,
		   lng: 7.681,
		   zoom: 13
	   }
    }
]);
