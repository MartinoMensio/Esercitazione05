var app = angular.module('App');

app.factory('MongoRestClient', ['$http', '$q', function ($http, $q) {

    var host = 'http://localhost';
    var port = '9999';

    return {
        getMinPath: function (srcId, dstId) {
            var deferred = $q.defer();
            $http.get(host + ':' + port + '/min_paths/' + srcId + '_' + dstId).then(function (result) {
                deferred.resolve(result.data);
            }, function (result) {
                deferred.reject(result);
            });
            return deferred.promise;
        }
    }
}]);