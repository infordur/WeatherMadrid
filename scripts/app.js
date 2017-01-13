'use strict';

/**
 * @ngdoc overview
 * @name WeatherAppMadrid
 * @description
 * # WeatherAppMadrid
 *
 * Main module of the application.
 */
angular
  .module('weatherAppMadrid', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  });