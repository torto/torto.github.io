(function() {
  'use strict';
  socialBaseAngular.directive('todoListItem', [todoListItem]);

  function todoListItem() {
    return {
      restrict: 'E',
      scope: {
        listItem: '=list',
        removeItem : '&',
        cancelRemoveItem: '&'
      },
      templateUrl: 'js/directives/todo/item/TodoListItemView.html'
    };
  }
}());
