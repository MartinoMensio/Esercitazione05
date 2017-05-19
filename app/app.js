var app = angular.module('App', ['ngRoute', 'ngResource'])

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'MainCtrl',
            controllerAs: 'ctrl'
        })
        .otherwise({ redirectTo: "/" });

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
});

app.controller('MainCtrl', ['$scope', 'DataProvider',
    function ($scope, DataProvider) {
        this.lines = DataProvider.getLines();
    }
]);

app.factory('DataProvider', ['Linee',
    function (linee) {
        // console.log(linee);
        return {
            getLines: function() {
                return linee.lines;
            }
        };
    }
]);



app.directive('myDirective', function () {
    /*
  return {
  };
  */
});


