'use strict';

var xwc = angular.module('xwc', ['firebase']);

xwc.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'xwcMainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
