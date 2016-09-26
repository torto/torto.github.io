angular.module('conta-azul').controller('RegisterCarController', ['$scope', 'ListCarService', '$location',
  function($scope, ListCarService, $location) {

    var carAlter = ListCarService.getCarChange();
    $scope.car = {};
    $scope.car.combustivel = 'Gasolina';
    $scope.imagem = null;

    if (carAlter.placa) {
      $scope.car = carAlter;
    }

    /**
    Salva o Carro
    */
    $scope.saveCar = function() {
      if (carAlter.placa) {
        ListCarService.removeCar(carAlter).then(function() {
          ListCarService.addCar($scope.car).then(function(car) {
            $scope.car = {};
            $scope.cleanAlter();
            $location.path('/');
          });
        });
      } else {
        ListCarService.addCar($scope.car).then(function(car) {
          $scope.car = {};
          $location.path('/');
        });
      }
    };

    $scope.cleanAlter = function () {
      ListCarService.setCarChange({});
    };

  }
]);
