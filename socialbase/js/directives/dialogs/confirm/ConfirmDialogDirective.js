(function() {
  'use strict';
  socialBaseAngular.directive('confirmDialog', [confirmDialog]);

  function confirmDialog() {
    return {
      restrict: 'E',
      scope: {
        message: '=',
        labelCancel: '=',
        labelOk: '=',
        onSuccess: '&',
        onCancel: '&',
        index: '=',
        model: '=',
        show: '='
      },
      templateUrl: 'js/directives/dialogs/confirm/ConfirmDialogView.html',
      link: function(scope, params, algo) {
        function init(){
          setMethods();
        }

        function setMethods(){
          scope.clickOnOk = clickOnOk;
          scope.clickOnCancel = clickOnCancel;
        }

        function clickOnOk(){
          scope.show = false;
          scope.onSuccess({index: scope.index, elem: scope.model});
        }

        function clickOnCancel(){
          scope.show = false;
          scope.onCancel({index: scope.index, elem: scope.model});
        }
        init();
      }
    };
  }
}());
