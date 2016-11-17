/**
 * "Reset on" directive for Angular 1.0
 * 
 * Reset a field when a given scope condition is true
 *
 * @author  Waldir Pereira <waldirpereira@gmail.com>
 */

(function () {
    'use strict';

    angular.module('ng-reset-on', [])
        .directive("ngResetOn", ResetOn);

    function ResetOn() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModelCtrl) {
                $scope.$watch(attrs.ngResetOn, function () {
                    if (!$scope.$eval(attrs.ngResetOn)) 
                      return;
                      
                    if (!ngModelCtrl.$modelValue && typeof(ngModelCtrl.$modelValue) !== "boolean")
                        return;

                    if (Array.isArray(ngModelCtrl.$modelValue)) {
                        //specific treatment for multiple uiSelect
                        var uiSelect = element.controller('uiSelect');
                        if (uiSelect && uiSelect.multiple)
                            uiSelect.selected.length = 0;

                        ngModelCtrl.$modelValue.length = 0;
                    } else {
                        ngModelCtrl.$setViewValue(undefined);
                    }
                    
                    ngModelCtrl.$render();
                });
            }
        };
    }
})();