(function() {
  'use strict';

  angular.module('socialbase', ['ngRoute']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
      templateUrl: 'partials/index.html',
      controller: 'IndexController'
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });

  }]);

  window.socialBaseAngular = angular.module('socialbase');
}());
