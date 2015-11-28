(function() {
  'use strict';

  angular.module('conta-azul', ['ngRoute']).config(['$routeProvider',function($routeProvider) {

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
      redirectTo: '/index'
    });

  }]);

}());
