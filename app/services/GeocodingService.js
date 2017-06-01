var app = angular.module('App');

app.factory('GeocodingService', ['$http', '$q', 'DataProvider', function ($http, $q, DataProvider) {

    // please if you are using this code, change the token or it will reach the quota and won't work
    var mapsKey = 'AIzaSyCL8dY-vuMWMd6hb10aPPctsyenIMxPmi4';

    // find the bounding box for suggesting google maps to provide results relevant in this area
    var stops = DataProvider.getStops();
    var minLatLng = [Infinity, Infinity];
    var maxLatLng = [0, 0];
    stops.forEach(function (stop) {
        var curr = stop.latLng;
        if (curr[0] > maxLatLng[0]) { maxLatLng[0] = curr[0] }
        if (curr[1] > maxLatLng[1]) { maxLatLng[1] = curr[1] }
        if (curr[0] < minLatLng[0]) { minLatLng[0] = curr[0] }
        if (curr[1] < minLatLng[1]) { minLatLng[1] = curr[1] }
    }, this);

    return {
        // look at res.geometry.location for latlng
        getLocationFromString: function (queryString) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json',
                //dataType: 'jsonp',
                params: {
                    key: mapsKey,
                    address: queryString,
                    bounds: minLatLng + '|' + maxLatLng
                }
            }).then(function (response) {
                // take the first result
                deferred.resolve(response.data.results[0]);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }
    }
}]);