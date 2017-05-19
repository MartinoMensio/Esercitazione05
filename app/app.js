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
        /* */
    }
]);

app.factory('DataProvider', ['Linee',
    function (linee) {
        // console.log(linee);
        return {};
    }
]);



app.directive('myDirective', function () {
    /*
  return {
  };
  */
});


