(function() {
  'use strict';

  angular.module('conta-azul', ['ngRoute']).config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
$locationProvider.html5Mode(true);
    $routeProvider.when('/', {
      templateUrl: 'partials/index.html',
      controller: 'IndexController'
    });

    $routeProvider.when('/register/car', {
      templateUrl: 'partials/register-car/register-car.html',
      controller: 'RegisterCarController'
    });

    $routeProvider.when('/alter/car', {
      templateUrl: 'partials/register-car/register-car.html',
      controller: 'RegisterCarController'
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });

  }]);

}());
