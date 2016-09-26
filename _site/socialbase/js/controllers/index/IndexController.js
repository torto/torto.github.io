(function() {
  'use strict';
  socialBaseAngular.controller('IndexController', ['$scope', 'IndexService', IndexController]);

  function IndexController($scope, IndexService) {
    function init() {
      setVariables();
      setMethods();
      getElements();
      watchList();
    }

    function setVariables() {
      $scope.title = 'TODO-List';
      $scope.isList = true;
      $scope.todoListElements = [];
    }

    function setMethods() {
      $scope.removeItem = removeItem;
      $scope.cancelRemoveItem = cancelRemoveItem;
      $scope.addItem = addItem;
    }

    function getElements() {
      $scope.todoListElements = IndexService.getList();
    }

    function watchList() {
      $scope.$watchCollection('todoListElements', function() {
        IndexService.setListStorage($scope.todoListElements, function(response) {
          $scope.todoListElements = response;
        }, true);
      });
    }

    function removeItem(elem, index) {
      $scope.todoListElements.splice(index, 1);
    }

    function cancelRemoveItem(elem, index) {}

    function addItemInArray(item){
      $scope.todoListElements.push({description: item, isChecked: false});
    }

    function addItem(item){
      addItemInArray(item);
    }

    init();
  }
}());
