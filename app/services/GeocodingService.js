var app = angular.module('App');

app.factory('GeocodingService', ['$http', '$q', function ($http, $q) {

    // please if you are using this code, change the token or it will reach the quota and won't work
    var mapsKey = 'AIzaSyCL8dY-vuMWMd6hb10aPPctsyenIMxPmi4'

    return {
        // look at res.geometry.location for latlng
        getLocationFromString: function (queryString) {
            var deferred = $q.defer();
            //$httpProvider.defaults.useXDomain = true;
            //delete $httpProvider.defaults.headers.common['X-Requested-With'];
            //delete $http.defaults.headers.common['X-Requested-With']; 
            $http({
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json',
                //dataType: 'jsonp',
                params: {
                    key: mapsKey,
                    address: queryString
                }
            }).then(function (response) {
                console.log(response);
                // take the first result
                deferred.resolve(response.data.results[0]);
            }, function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }
    }
}]);