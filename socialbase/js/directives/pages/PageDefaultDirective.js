(function() {
  'use strict';
  socialBaseAngular.directive('pageDefault', [todoListDirective]);

  function todoListDirective() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        title: '@',
        isList: '=list'
      },
      templateUrl: 'js/directives/pages/PageDefaultView.html'
    };
  }
}());
