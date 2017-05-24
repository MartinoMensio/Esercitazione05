var app = angular.module('App');

app.factory('MinPathProvider', ['FakeBestPath', 'Linee', function (FakeBestPath, linee) {

    // builds the array of features (each one represents an edge)
    var getEdgeFeatures = function (edges) {
        var result = [];
        edges.forEach(function (edge) {
            var edgeFeature = getEdgeFeature(edge);
            result.push(edgeFeature);
        }, this);
        return result;
    }

    // returns the geojson for an edge
    var getEdgeFeature = function (edge) {
        result = {
            type: "Feature",
            properties: {
                name: "line",
                mode: edge.mode,
                lineId: edge.lineId,
                cost: edge.cost
            },
            geometry: {
                type: "LineString",
                coordinates: []
            },
            style: {
                color: "#ffc800",
                weight: 5,
                opacity: 0.65
            }
        }
        if (edge.mode) {
            // this is a walk edge
            var srcStop = linee.stops.find(s => s.id === edge.idSource);
            if (srcStop) {
                // add the stop coordinates to the array
                result.geometry.coordinates.push([srcStop.latLng[1], srcStop.latLng[0]]);
            }
            var dstStop = linee.stops.find(s => s.id === edge.idDestination);
            if (dstStop) {
                // add the stop coordinates to the array
                result.geometry.coordinates.push([dstStop.latLng[1], dstStop.latLng[0]]);
            }
        } else {
            // this is a bus edge
            edge.stopsId.forEach(function (stopId) {
                var stop = linee.stops.find(s => s.id === stopId);
                if (stop) {
                    // add the stop coordinates to the array
                    result.geometry.coordinates.push([stop.latLng[1], stop.latLng[0]]);
                }
            }, this);
        }
        return result;
    }

    return {
        // src and dst are arrays with lat&lng inside
        getMinPathBetween: function (src, dst) {
            // TODO get a real best path using src and dst
            var path = FakeBestPath;

            var edgeFeatures = getEdgeFeatures(path.edges);

            return {
                geojson: {
                    data: {
                        type: "FeatureCollection",
                        features: edgeFeatures
                    }
                },
                markers: {

                }
            }
        }
    }
}]);