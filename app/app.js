var app = angular.module('App', ['ngRoute', 'ngResource', 'ui-leaflet', 'ui.router'])

app.config(function ($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
    /*$routeProvider
        .when('/', {
            templateUrl: 'templates/busLinesList.html',
            controller: 'TestCtrl',
            controllerAs: 'ctrl'
        })
        .when('/bestpath', {
            templateUrl: 'templates/bestpath.html',
            controller: 'BestPathCtrl',
            controllerAs: 'ctrl' /* *** Opportuno cambiare nome ? Rispondete qui a fianco... *** */
        /*})
        .when('/:lineId', {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl',
            controllerAs: 'ctrl'
        })
        .otherwise({ redirectTo: "/" });*/

    $urlRouterProvider.otherwise('/');

    // States defintion
    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
        })
        .state('busLines', {
            url: '/busLines',
            templateUrl: 'templates/busLinesList.html',
            controller: 'TestCtrl',
            controllerAs: 'ctrl'
        })
        .state('busLines.line', {
            url: '/{lineId}',
            templateUrl: 'templates/busLineMap.html',
            controller: 'TestCtrl',
            controllerAs: 'ctrl'
        })

        .state('bestPath', {
            url: '/bestPath',
            templateUrl: 'templates/bestpath.html',
            controller: 'BestPathCtrl',
            controllerAs: 'ctrl'
        });

    // configure html5 to get links working on jsfiddle
    //$locationProvider.html5Mode(true);
});

// TODO vedere se serve definire direttive custom o se ce la caviamo con quelle esistenti
app.directive('myDirective', function () {
    /*
  return {
  };
  */
});
