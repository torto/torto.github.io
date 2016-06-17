(function() {
  'use strict';
  socialBaseAngular.directive('todoListAddItem', [todoListAddItem]);

  function todoListAddItem() {
    return {
      restrict: 'E',
      scope: {
        listItem: '=list',
        addItem: '&'
      },
      templateUrl: 'js/directives/todo/new-item/TodoListAddItemView.html',
      link: function(scope, params, algo) {
        function init() {
          setVariables();
          setMethods();
        }

        function setMethods(){
          scope.addItemEnter = addItemEnter;
          scope.cleanValues = cleanValues;
        }

        function setVariables() {
          scope.newItem = '';
        }

        function cleanValues(){
          scope.newItem = '';
        }

        function addItemEnter(event){
          if(event.keyCode === 13){
            scope.addItem({item: scope.newItem});
            cleanValues();
          }
        }

        init();
      }
    };
  }
}());
