var app = angular.module('App', ['ngRoute', 'ngResource', 'ui-leaflet', 'ui.router'])

app.config(function ($locationProvider, $urlRouterProvider, $stateProvider) {
    // If the URL does not correspond to anything then redirect to '/'
    $urlRouterProvider.otherwise('/');

    // States defintion
    $stateProvider
        // Home page state
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
        })
        // Bus lines list page
        .state('busLines', {
            url: '/busLines',
            templateUrl: 'templates/busLinesList.html',
            controller: 'MainCtrl',
            controllerAs: 'ctrl'
        })
        // Bus lines list page + map visualization
        .state('busLines.line', {
            url: '/{lineId}',
            templateUrl: 'templates/busLineMap.html',
            controller: 'MainCtrl',
            controllerAs: 'ctrl'
        })
        // Best path page
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
