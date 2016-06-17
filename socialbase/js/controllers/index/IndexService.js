(function() {
  'use strict';
  socialBaseAngular.service('IndexService', ['$sessionStorage', IndexService]);

  function IndexService($sessionStorage) {
    var service = this;
    var list = [];

    if ($sessionStorage.list) {
      list = $sessionStorage.list;
    }

    function getList() {
      return list;
    }

    function setListStorage(listElements, callback) {
      $sessionStorage.list = listElements;
      list = listElements;
      callback(list);
    }

    function cleanStorage(){
      $sessionStorage.list = [];
      list = [];
    }

    service.getList = getList;
    service.setListStorage = setListStorage;
    service.cleanStorage = cleanStorage;

  }
}());
