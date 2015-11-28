angular.module('conta-azul').controller('IndexController', ['$scope', 'ListCarService', '$q','$location',
  function($scope, ListCarService, $q, $location) {

    $scope.listCar = {
      list: [],
      labels: [],
      search: {
        marca: '',
        modelo: ''
      },
      pageSize: 5,
      currentPage: 0
    };

    /**
    Faz a troca de paginacao da tabela
    */
    $scope.setListPosition = function(position) {
        $scope.listCar.currentPage = position;
    };

    /**
    Remove todos os carros inseridos no itemSelect
    */
    $scope.removeCar = function() {
      var remove = [];
      for (var i = 0; i < $scope.listCar.itemSelect.length; i++) {
        var method = ListCarService.removeCar($scope.listCar.itemSelect[i]).then(function(value) {
        });
        remove.push(method);
      }
      var update = ListCarService.getAllListCar().then(function(values) {
        $scope.listCar.list = values;
        $scope.listCar.itemSelect = [];
        // $scope.$apply();
      });
      remove.push(update);
      $q.all(remove);

    };

    /**
    Executa a ação de filtro
    */
    $scope.$watch('listCar.search', function(newVal, oldVal) {

      var newArray = $scope.listCar.list.filter($scope.filterCars);
      $scope.listCar.filtered = newArray;
      $scope.listCar.totalPages = Math.ceil($scope.listCar.filtered.length / $scope.listCar.pageSize);
      $scope.listCar.currentPage = 0;
    }, true);

    $scope.filterCars = function(item) {
      if (angular.lowercase(item.marca).indexOf(angular.lowercase($scope.listCar.search.marca)) !== -1 || angular.lowercase(item.modelo).indexOf(angular.lowercase($scope.listCar.search.modelo)) !== -1) {
        return true;
      }
      return false;
    };

    $scope.changeCarPage= function(car){
      ListCarService.setCarChange(car);
      $location.path('/alter/car');
    };

    /**
    Init do controller
    */
    ListCarService.getAllListCar().then(function(values) {
      $scope.listCar.list = values;
    });

    ListCarService.labelTable(function(labels) {
      $scope.listCar.labels = labels;
    });
  }
]);
