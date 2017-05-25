var app = angular.module('App');

app.factory('MinPathProvider', ['FakeBestPath', 'Linee', 'MongoRestClient', '$q', '$timeout', function (FakeBestPath, linee, MongoRestClient, $q, $timeout) {

    // returns the geojson for an edge
    var getEdgeFeature = function (edge) {
        result = {
            data: {
                type: "LineString",
                coordinates: [],
                properties: {
                    name: "line",
                    mode: edge.mode,
                    lineId: edge.lineId,
                    cost: edge.cost
                }
            },
            style: {
                color: "#" + ((1 << 24) * Math.random() | 0).toString(16),
                weight: 5,
                opacity: 0.65
            }
        }
        if (edge.mode) {
            // this is a walk edge
            var srcStop = linee.stops.find(s => s.id === edge.idSource);
            if (srcStop) {
                // add the stop coordinates to the array
                result.data.coordinates.push([srcStop.latLng[1], srcStop.latLng[0]]);
            }
            var dstStop = linee.stops.find(s => s.id === edge.idDestination);
            if (dstStop) {
                // add the stop coordinates to the array
                result.data.coordinates.push([dstStop.latLng[1], dstStop.latLng[0]]);
            }
        } else {
            // this is a bus edge
            edge.stopsId.forEach(function (stopId) {
                var stop = linee.stops.find(s => s.id === stopId);
                if (stop) {
                    // add the stop coordinates to the array
                    result.data.coordinates.push([stop.latLng[1], stop.latLng[0]]);
                }
            }, this);
        }
        return result;
    }

    var getEdgeSourceMarker = function (edge) {
        var srcStop = linee.stops.find(s => s.id === edge.idSource);
        var result = {
            lat: srcStop.latLng[0],
            lng: srcStop.latLng[1],
            focus: false,
            message: '<h3>' + srcStop.id + ' - ' + srcStop.name + '</h3>'
        }
        if (edge.mode) {
            result.message += 'procedere a piedi';
        } else {
            result.message += 'prendere linea ' + edge.lineId;
        }
        return result;
    };

    // do the conversion from MinPath to geoJson
    var getResultFromMinPath = function (minPath) {
        var result = {
            // is filled later
            geojson: {},
            markers: {}
        }
        minPath.edges.forEach(function (edge) {
            var edgeFeature = getEdgeFeature(edge);
            // nested geojson for the edge
            result.geojson[edge.idSource + '_' + edge.idDestination] = edgeFeature;
            // get a marker for the source of the edge
            var edgeSourceMarker = getEdgeSourceMarker(edge);
            result.markers[edge.idSource] = edgeSourceMarker;
        }, this);

        return result;
    }

    // returns the bus stop nearest to the provided point
    var findNearestStop= function(point) {
        var minDistSq = Infinity;
        var bestStop = null;
        linee.stops.forEach(function(stop) {
            var distSq = Math.pow(point.lat-stop.latLng[0], 2) + Math.pow(point.lng-stop.latLng[1], 2);
            if (distSq < minDistSq) {
                bestStop = stop;
                minDistSq = distSq;
            }
        }, this);
        return bestStop;
    }

    return {
        // src and dst are objects {lat,lng}
        // useRealMinPath true means that a connection to MongoRest will be done to get a MinPath
        getMinPathBetween: function (src, dst, useRealMinPath = false) {
            // TODO get a real best path using src and dst
            var path = null;
            if (useRealMinPath) {
                var srcStopId = findNearestStop(src).id;
                var dstStopId = findNearestStop(dst).id;
                return MongoRestClient.getMinPath(srcStopId, dstStopId).then(function(result) {
                    // convert from MinPath to geojson
                    return getResultFromMinPath(result);
                }, function(result) {
                    // if it fails, provide fake data
                    return getResultFromMinPath(FakeBestPath);
                })
            } else {
                // return a short-term promise only to have the same interface as when userRealMinPath is set to true
                path = FakeBestPath;
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(getResultFromMinPath(path));
                }, 0);
                return deferred.promise;
            }


        }
    }
}]);