/**
 * "Reset on" directive for Angular 2.0
 * 
 * Resets to its initial value (or clean) a field when a given scope condition is true
 *
 * @author  Waldir Pereira <waldirpereira@gmail.com>
 * https://github.com/waldirpereira/angular-reset-on
 */

(function () {
    'use strict';

    angular.module('ng-reset-on', [])
        .directive("ngResetOn", ["$timeout", ResetOn]);

    function ResetOn($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModelCtrl) {
              var initialValue;
              
              $timeout(function() {
                initialValue = (attrs.value || ngModelCtrl.$modelValue || ngModelCtrl.$viewValue);
				console.log("_______________initialValue = " + initialValue);
              });
              
              var mode = attrs.mode || "clean";
              if (mode !== "clean" && mode !== "reset")
                throw("ng-reset-on error: mode must be 'clean' or 'reset'");
            
              $scope.$watch(attrs.ngResetOn, function () {
                if (!$scope.$eval(attrs.ngResetOn)) 
                  return;

                mode = attrs.mode || "clean";
                if (mode !== "clean" && mode !== "reset")
                  throw("ng-reset-on error: mode must be 'clean' or 'reset'");
                
                var resetValue;
                if (mode === "reset")
                  resetValue = initialValue;
			  console.log("_______________________________resetValue = " + resetValue);
                
                if (!ngModelCtrl.$modelValue && typeof(ngModelCtrl.$modelValue) !== "boolean" && mode === "clean")
                    return;

                if (Array.isArray(ngModelCtrl.$modelValue)) {
                  
                  //specific treatment for multiple uiSelect
                  var uiSelect = element.controller('uiSelect');
                  if (uiSelect && uiSelect.multiple) {
                    if (resetValue) {
                      uiSelect.selected.length = 0;
                      resetValue.forEach(function(val){
                        uiSelect.selected.push(val);
                      });
                    }
                    else
                      uiSelect.selected.length = 0;
                  }
                  
                  if (resetValue)
                    ngModelCtrl.$setViewValue(resetValue);
                  else
                    ngModelCtrl.$modelValue.length = 0;
                } else {
                  ngModelCtrl.$setViewValue(resetValue);
                }
                
                ngModelCtrl.$render();
              });
            }
        };
    }
})();
//# sourceMappingURL=angular-reset-on.js.map
