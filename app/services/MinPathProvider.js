var app = angular.module('App');

app.factory('MinPathProvider', ['FakeBestPath', 'Linee', 'MongoRestClient', '$q', '$timeout', function (FakeBestPath, linee, MongoRestClient, $q, $timeout) {

    // returns a RGB color with luminance not greater than 50% and saturation 100%
    var getRandomColor = function () {
        var rgb_out = Math.floor(2.9999 * Math.random());
        var result = '#';
        for (var index = 0; index < 3; index++) {
            var r_256 = ((1 << 8) * Math.random() | 0).toString(16);
            var padded = '00'.substring(r_256.length) + r_256;
            result += (index != rgb_out) ? padded : '00';
        }
        console.log(result);
        return result;
    }

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
                color: getRandomColor(),
                weight: 5,
                opacity: 1
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

    var createEdge = function (src, dst) {
        return {
            data: {
                type: "LineString",
                coordinates: [[src[1], src[0]], [dst[1], dst[0]]],
                properties: {
                    name: "line",
                }
            },
            style: {
                color: getRandomColor(),
                weight: 5,
                opacity: 1
            }
        };
    }

    var createMarker = function (point, msg) {
        return {
            lat: point[0],
            lng: point[1],
            focus: false,
            message: msg
        };
    }

    // do the conversion from MinPath to geoJson
    var getResultFromMinPath = function (minPath, src, dst) {
        var result = {
            // is filled later
            geojson: {},
            markers: {}
        }
        /*
               // add a walking edge at the beginning from the clicked point
               minPath.edges.unshift({
                   idSource: "SRC",
                   idDestination: minPath.edges[0].idSource,
                   mode: true,
                   lineId: null,
               });
               // and a walking edge at the end of the found path to the second clicked point
               minPath.edges.push({
                   idSource: minPath.edges[minPath.edges.length -1].idSource,
                   idDestination: "DST",
                   mode: true,
                   lineId: null
               });
       */
        minPath.edges.forEach(function (edge) {
            var edgeFeature = getEdgeFeature(edge);
            // nested geojson for the edge
            result.geojson[edge.idSource + '_' + edge.idDestination] = edgeFeature;
            // get a marker for the source of the edge
            var edgeSourceMarker = getEdgeSourceMarker(edge);
            result.markers[edge.idSource] = edgeSourceMarker;
        }, this);
        var firstStop = linee.stops.find(s => s.id === minPath.edges[0].idSource);
        var lastStop = linee.stops.find(s => s.id === minPath.edges[minPath.edges.length - 1].idDestination);
        result.geojson['first'] = createEdge([src.lat, src.lng], firstStop.latLng);
        result.geojson['last'] = createEdge(lastStop.latLng, [dst.lat, dst.lng]);
        result.markers['source'] = createMarker([src.lat, src.lng], 'Partire a piedi');
        result.markers['penultimate'] = createMarker(lastStop.latLng, '<h3>' + lastStop.id + ' - ' + lastStop.name + '</h3>procedere a piedi');
        result.markers['destination'] = createMarker([dst.lat, dst.lng], 'destinazione raggiunta');
        return result;
    }

    // returns the bus stop nearest to the provided point
    var findNearestStop = function (point) {
        var minDistSq = Infinity;
        var bestStop = null;
        linee.stops.forEach(function (stop) {
            var distSq = Math.pow(point.lat - stop.latLng[0], 2) + Math.pow(point.lng - stop.latLng[1], 2);
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
                return MongoRestClient.getMinPath(srcStopId, dstStopId).then(function (result) {
                    // convert from MinPath to geojson
                    return getResultFromMinPath(result, src, dst);
                }, function (result) {
                    // if it fails, provide fake data
                    return getResultFromMinPath(FakeBestPath, src, dst);
                })
            } else {
                // return a short-term promise only to have the same interface as when userRealMinPath is set to true
                path = FakeBestPath;
                var deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(getResultFromMinPath(path, src, dst));
                }, 0);
                return deferred.promise;
            }


        }
    }
}]);
