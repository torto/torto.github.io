angular.module('conta-azul').factory('ListCarService', ['$q', function($q) {
  'use strict';
  var carChange = {};

  var listAllCar = [{
    combustivel: "Flex",
    imagem: null,
    marca: "Volkswagem",
    modelo: "Gol",
    placa: "FFF-5498",
    valor: 20000
  }, {
    combustivel: "Gasolina",
    imagem: null,
    marca: "Volkswagem",
    modelo: "Fox",
    placa: "FOX-4125",
    valor: 20000
  }, {
    combustivel: "Alcool",
    imagem: "http://2.bp.blogspot.com/_lkkBt-EnhRs/TPDsQPiT1LI/AAAAAAAAIhQ/7irCdCPghlk/s1600/Image00004.jpg",
    marca: "Volkswagen",
    modelo: "Fusca",
    placa: "PAI-4121",
    valor: 20000
  }];
  var arrays = [];

  var retorno = {
    labelTable: function(callback) {
      var jsonReturn = [{
        label: 'Placa',
        value: 'placa',
        size: 'col-md-2',
        require: true
      }, {
        label: 'Modelo',
        value: 'modelo',
        size: 'col-md-2',
        require: true
      }, {
        label: 'Marca',
        value: 'marca',
        size: 'col-md-2',
        require: true
      }, {
        label: 'Foto',
        value: 'imagem',
        size: 'col-md-2'
      }, {
        label: 'Combustível',
        value: 'combustivel',
        size: 'col-md-2'
      }, {
        label: 'Valor',
        value: 'valor',
        size: 'col-md-2 text-right padding-table'
      }];
      callback(jsonReturn);
    },
    getAllListCar: function() {
      updateSplit();
      var deferred = $q.defer();
      if (arrays) {
        deferred.resolve(listAllCar);
      } else {
        deferred.reject(0);
      }
      return deferred.promise;
    },
    getNumberListCar: function() {
      updateSplit();
      var deferred = $q.defer();
      if (arrays) {
        deferred.resolve(arrays.length);
      } else {
        deferred.reject(0);
      }
      return deferred.promise;
    },
    getListCar: function(position) {
      updateSplit();
      var deferred = $q.defer();
      if (arrays) {
        var jsonReturn = arrays[position];
        deferred.resolve(jsonReturn);
      } else {
        deferred.reject(0);
      }
      return deferred.promise;
    },
    addCar: function(car) {
      updateSplit();
      var deferred = $q.defer();
      if (arrays) {
          listAllCar.push(car);
          deferred.resolve(car);
      } else {
        deferred.reject(false);
      }
      return deferred.promise;
    },
    removeCar: function(car) {
      updateSplit();
      var deferred = $q.defer();
      if (arrays) {
        var index = listAllCar.indexOf(car);
        if (index > -1) {
          listAllCar.splice(index, 1);
          deferred.resolve(true);
        } else {
          deferred.reject(false);
        }
      } else {
        deferred.reject(false);
      }
      return deferred.promise;
    },
    getCar: function(positionList, position) {
      updateSplit();
      var deferred = $q.defer();
      if (arrays) {
          deferred.resolve(arrays[positionList][position]);
      } else {
        deferred.reject(false);
      }
      return deferred.promise;
    },
    setCarChange: function (car) {
      carChange = car;
    }, getCarChange: function () {
      return carChange;
    }
  };

  // Utils
  function splitArray(arr, size) {
    var arr2 = arr.slice(0),
      arrays = [];

    while (arr2.length > 0) {
      arrays.push(arr2.splice(0, size));
    }

    return arrays;
  }

  function updateSplit() {
    arrays = splitArray(listAllCar, 5);
  }

  return retorno;

}]);
