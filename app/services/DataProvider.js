var app = angular.module('App');

app.factory('DataProvider', ['Linee',
    function (linee) {

        // this function returns the points [[x,y]] from a line
        var getLinePoints = function (line) {
            var result = [];
            line.stops.forEach(function (stopId) {
                // get the stop details
                var stop = linee.stops.find(s => s.id === stopId);
                if (stop) {
                    // add the stop coordinates to the result array
                    result.push([stop.latLng[1], stop.latLng[0]]);
                }
            }, this);
            return result;
        }

        // this function returns the markers of the busstops belonging to a line
        var getStopsMarkers = function (line) {
            markers = {};

            line.stops.forEach(function (stopId) {
                var stop = linee.stops.find(s => s.id === stopId);

                var lines = '<ul>';
                stop.lines.forEach(function(line) {
                    lines += '<li>' + line + '</li>';
                }, this);
                lines += '</ul>';

                markers[stop.id] = {
                    lat: stop.latLng[0],
                    lng: stop.latLng[1],
                    focus: false,
                    message: '<h3>' + stop.id + ' - '+ stop.name + '</h3>' + lines
                }
            }, this);

            return markers;
        }

        return {
            // function to get all the lines
            getLines: function () {
                return linee.lines;
            },

            // function to get all the stops
            getStops: function() {
                return linee.stops;
            },

            // function to get the line details
            getLineByIdAsGeoJson: function (lineId) {
                line = linee.lines.find(l => l.line === lineId);
                if (line === undefined) {
                    // wrong parameter
                    return {};
                }

                // the array of points
                var linePoints = getLinePoints(line);
                // an array of lat,lng
                var latlngs = [];
                linePoints.forEach(function (coordinate) {
                    // transform [x,y] to {lat, lng}
                    latlngs.push(L.GeoJSON.coordsToLatLng(coordinate));
                }, this);
                return {
                    // the path of the busline
                    geojson: {
                        data: {
                            type: "LineString", coordinates: linePoints
                        },
                        style: {
                            "color": "#ff7800",
                            "weight": 5,
                            "opacity": 0.65
                        }
                    },
                    // the markers corresponding to the busstops of the line
                    markers: getStopsMarkers(line),
                    // an array of {lat,lng} for centering the map on the provided data
                    latlngs: latlngs
                }
            }
        };
    }
]);
