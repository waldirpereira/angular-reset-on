(function () {
  'use strict';
  
  describe('Testing ng-reset-on directive', function() {
    var $rootScope, $compile, $scope, element;

    beforeEach(module('ng-reset-on'));

    beforeEach(inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
    }));

    function createElement(template) {
      element = angular.element(template);
      $compile(element)($scope);
      $scope.$digest();
      return element;
    }
    
    function runTest(modelValue, template, expected) {
      $scope.testModel = modelValue;
      $scope.testValue = 0;
      var element = createElement(template);

      expect($scope.testModel).toEqual(modelValue);
      
      $scope.testValue = 1;
      $scope.$digest();

      expect($scope.testModel).toEqual(expected);
    }
    
    describe('should make ngModel = undefined when testValue === 1 for simple inputs', function() {
      it('text input', function () {
        runTest('text', '<input type="text" ng-model="testModel" ng-reset-on="testValue === 1">', undefined);
      });
      
      it('radio input', function () {
        runTest(true, '<input type="radio" ng-model="testModel" ng-reset-on="testValue === 1">', undefined);
      });
      
      it('checkbox input', function () {
        runTest(true, '<input type="checkbox" ng-model="testModel" ng-reset-on="testValue === 1">', undefined);
      });
      
      it('textarea input', function () {
        runTest('text \n multiple lines', '<textarea ng-model="testModel" ng-reset-on="testValue === 1"></textarea>', undefined);
      });
      
      it('simple select input', function () {
        runTest('a', '<select ng-model="testModel" ng-reset-on="testValue === 1">' +
          '<option ng-value="a">A</option>' +
          '<option ng-value="b">B</option>' +
          '<option ng-value="c">C</option>' +
          '</select>', undefined);
      });
    });

    describe('should make ngModel = [] when testValue === 1 for multi-value inputs', function() {
    
      it('multiple select input', function () {
        runTest(['b', 'c'], '<select ng-model="testModel" multiple ng-reset-on="testValue === 1">' +
          '<option ng-value="a">A</option>' +
          '<option ng-value="b">B</option>' +
          '<option ng-value="c">C</option>' +
          '</select>', []);
      });
    });
  });
}());