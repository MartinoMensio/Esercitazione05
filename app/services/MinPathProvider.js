var app = angular.module('App');

app.factory('MinPathProvider', ['FakeBestPath', 'Linee', function (FakeBestPath, linee) {

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

    return {
        // src and dst are arrays with lat&lng inside
        getMinPathBetween: function (src, dst) {
            // TODO get a real best path using src and dst
            var path = FakeBestPath;

            var result = {
                // is filled later
                geojson: {},
                markers: {}
            }
            path.edges.forEach(function (edge) {
                var edgeFeature = getEdgeFeature(edge);
                // nested geojson for the edge
                result.geojson[edge.idSource + '_' + edge.idDestination] = edgeFeature;
                // get a marker for the source of the edge
                var edgeSourceMarker = getEdgeSourceMarker(edge);
                result.markers[edge.idSource] = edgeSourceMarker;
            }, this);

            return result;
        }
    }
}]);