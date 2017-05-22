var app = angular.module('App', ['ngRoute', 'ngResource', 'ui-leaflet'])

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl',
            controllerAs: 'ctrl'
        })
        .when('/bestpath', {
            templateUrl: 'templates/bestpath.html',
            controller: 'BestPathCtrl',
            controllerAs: 'ctrl' /* *** Opportuno cambiare nome ? Rispondete qui a fianco... *** */
        })
        .when('/:lineId', {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl',
            controllerAs: 'ctrl'
        })
        .otherwise({ redirectTo: "/" });

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
});

// TODO vedere se serve definire direttive custom o se ce la caviamo con quelle esistenti
app.directive('myDirective', function () {
    /*
  return {
  };
  */
});
