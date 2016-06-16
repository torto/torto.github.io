(function() {
  'use strict';
  socialBaseAngular.directive('todoListItem', [todoListItem]);

  function todoListItem() {
    return {
      restrict: 'E',
      scope: {
        listItem: '=list'
      },
      templateUrl: 'js/directives/todo/item/TodoListItemView.html',
      link: function(scope, params, algo) {
        
      }
    };
  }
}());
