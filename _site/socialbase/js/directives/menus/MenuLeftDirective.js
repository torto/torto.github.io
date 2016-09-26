(function() {
  'use strict';
  socialBaseAngular.directive('menuLeft', [menuLeftDirective]);

  function menuLeftDirective() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/menus/MenuLeftView.html'
    };
  }
}());
