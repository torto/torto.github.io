angular.module('conta-azul').directive('tableList', [function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/table-list/table-list.html',
    scope: {
      options: "=",
      pagination: "@",
      onChangePage: "&",
      onRemoveItem: "&",
      onClickItem: "&"
    },
    link: function(scope, elem, attrs) {
      if (scope.pagination) {
        scope.pagination = true;
      } else {
        scope.pagination = false;
      }

      $(elem).on('change', 'input[type="checkbox"]', function(e) {
        $(this).closest('tr:not(:has(th))').toggleClass('table-select');
        e.preventDefault();
      });
      scope.options.fullSelect =false;
      scope.$watch('options.fullSelect', function(newValue) {
        $('.checkbox-full').change();
      });

      $('.checkbox-full').on('change', function(e) {
        var tr = null;
        if ($(this).is(':checked')) {
          tr = $(elem).find('.table tr td input[type="checkbox"]:not(:checked)');
          for (var i = 0; i < tr.length; i++) {
            $(tr[i]).attr('checked', true).prop('checked', true);
            $(tr[i]).change();
          }
        } else {
          tr = $(elem).find('.table tr td input[type="checkbox"]:checked');
          for (var j = 0; j < tr.length; j++) {
            if ($(tr[j]).is(':checked')) {
              $(tr[j]).attr('checked', false).prop('checked', false);
              $(tr[j]).change();
            }
          }
        }
      });


      $(elem).on('click', '.pagination li', function() {
        var tr = $(elem).find('.table tr input[type="checkbox"]:checked');
        for (var i = 0; i < tr.length; i++) {
          $(tr[i]).attr('checked', false).change();
        }

      });
    },
    controller: function($scope) {

      $scope.numberOfPages = function() {
        return Math.ceil($scope.options.list.length / $scope.options.pageSize);
      };
      $scope.options.totalPages = $scope.numberOfPages();

      $scope.options.itemSelect = [];
      $scope.selectItemTableDirective = function(value) {
        var index = $scope.options.itemSelect.indexOf(value);
        if (index <= -1) {
          $scope.options.itemSelect.push(value);

        } else {
          $scope.options.itemSelect.splice(index, 1);
        }
      };
      $scope.setFullObject = function(list) {
        var valueInit = $scope.options.currentPage*$scope.options.pageSize;
        if ($scope.options.pageSize > $scope.options.list.length) {
          if ($scope.options.itemSelect.length < $scope.options.list.length) {

            for (var i = valueInit; i < list.length; i++) {
              $scope.options.itemSelect.push(list[i]);
            }

          } else {
            $scope.options.itemSelect = [];
          }
        } else {
          if ($scope.options.itemSelect.length < $scope.options.pageSize) {
            for (var j = valueInit; j < valueInit + $scope.options.pageSize; j++) {
              $scope.options.itemSelect.push(list[j]);
            }
          } else {
            $scope.options.itemSelect = [];
          }
        }
      };
      $scope.changePageTableDirective = function(position) {
        if (position >= 0 && (position + 1) <= $scope.options.totalPages) {
          $scope.options.itemSelect = [];
          $scope.onChangePage()(position);
          $scope.options.currentPage = position;
        }
      };
    }
  };
}]).filter('range', function() {
  return function(n) {
    var res = [];
    for (var i = 0; i < n; i++) {
      res.push(i);
    }
    return res;
  };
}).filter('startFrom', function() {
  return function(input, start) {
    if (input) {
      start = +start;
      return input.slice(start);
    }
    return [];
  };
});
