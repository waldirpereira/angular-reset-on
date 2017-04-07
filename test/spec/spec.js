(function () {
  'use strict';
  
  describe('ng-reset-on tests', function() {
	  var $rootScope, $compile, $scope, element;

	  beforeEach(module('ngSanitize'));
	  beforeEach(module('ng-reset-on'));
	  beforeEach(module('ui.select'));
	  
	  beforeEach(inject(function ($injector) {
		$rootScope = $injector.get('$rootScope');
		$compile = $injector.get('$compile');
		$scope = $rootScope.$new();
	  }));

	  function createElement(template, $timeout) {
		element = angular.element(template);
		$compile(element)($scope);
		$scope.$digest();
		$timeout && $timeout.flush();
		return element;
	  }
	  
	  function runTest(modelValue, template, expected, mode, $timeout) {
		$scope.testModel = modelValue;
		$scope.testValue = 0;

		var element = createElement(template, $timeout);

		expect($scope.testModel).toEqual(modelValue);

		mode = mode || "clean";
		if (mode === "reset") {
		  $scope.testModel = Array.isArray($scope.testModel) ? ["new value"] : "new value";
		  $scope.$digest();
		  expect($scope.testModel).toEqual(Array.isArray($scope.testModel) ? ["new value"] : "new value");
		}

		$scope.testValue = 1;
		$scope.$digest();
		expect($scope.testModel).toEqual(expected);
	  }

	  describe('should do nothing if model has no value and mode = undefined', function() {
		it('text input', function () {
		runTest(null, '<input type="text" ng-model="testModel" ng-reset-on="testValue === 1">', null);
		});
	  });
	  describe('should do nothing if model has no value and mode = clean', function() {
		it('text input', function () {
		runTest(null, '<input type="text" ng-model="testModel" ng-reset-on="testValue === 1" mode="clean">', null);
		});
	  });

	  describe('should throw if mode not in (clean, reset)', function() {
		it('text input', function () {
		function errorFunctionWrapper()
		{
		  createElement('<input type="text" ng-model="testModel" ng-reset-on="testValue === 1" mode="blah">');
		}
		expect(errorFunctionWrapper).toThrow();
		});
	  });

	  describe('should throw if mode is changed to not in (clean, reset)', function() {
		it('text input', function () {
			var modelValue = "text 123";
			$scope.testModel = modelValue;
			$scope.testValue = 0;
			$scope.modeTest = "clean";
			var element = createElement('<input type="text" ng-model="testModel" ng-reset-on="testValue === 1" mode="{{modeTest}}">');
			
			expect($scope.testModel).toEqual(modelValue);
			
			$scope.testValue = 1;
			$scope.$digest();
			expect($scope.testModel).toEqual(undefined);
			
			$scope.testValue = 0;
			$scope.$digest();
			
			function errorFunctionWrapper()
			{
			  $scope.modeTest = "blah";
			  $scope.testValue = 1;
			  $scope.$digest();		  
			}
			
			expect(errorFunctionWrapper).toThrow();
		});
	  });

	  describe('should make ngModel = undefined when testValue === 1 for simple inputs and mode = clean', function() {
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
		runTest('a', 
		  '<select ng-model="testModel" ng-reset-on="testValue === 1">' +
		  ' <option ng-value="a">A</option>' +
		  ' <option ng-value="b">B</option>' +
		  ' <option ng-value="c">C</option>' +
		  '</select>', undefined);
		});
	  });

	   describe('should make ngModel = initial value when testValue === 1 for simple inputs and mode = reset', function() {
		it('text input', inject(function ($timeout) {
		runTest('text', '<input type="text" ng-model="testModel" ng-reset-on="testValue === 1" mode="reset">', 'text', 'reset', $timeout);
		}));
		
		it('radio input', inject(function ($timeout) {
		runTest(true, '<input type="radio" ng-model="testModel" ng-reset-on="testValue === 1" mode="reset">', true, 'reset', $timeout);
		}));
		
		it('checkbox input', inject(function ($timeout) {
		runTest(true, '<input type="checkbox" ng-model="testModel" ng-reset-on="testValue === 1" mode="reset">', true, 'reset', $timeout);
		}));
		
		it('textarea input', inject(function ($timeout) {
		runTest('text \n multiple lines', '<textarea ng-model="testModel" ng-reset-on="testValue === 1" mode="reset"></textarea>', 'text \n multiple lines', 'reset', $timeout);
		}));
		
		it('simple select input', inject(function ($timeout) {
		runTest('a', 
		  '<select ng-model="testModel" ng-reset-on="testValue === 1" mode="reset">' +
		  ' <option ng-value="a">A</option>' +
		  ' <option ng-value="b">B</option>' +
		  ' <option ng-value="c">C</option>' +
		  '</select>', 'a', 'reset', $timeout);
		}));
	  });

	  describe('should make ngModel = [] when testValue === 1 for multi-value inputs', function() {
		it('multiple select input', function () {
		runTest(['b', 'c'], 
		  '<select ng-model="testModel" multiple ng-reset-on="testValue === 1">' +
		  ' <option ng-value="a">A</option>' +
		  ' <option ng-value="b">B</option>' +
		  ' <option ng-value="c">C</option>' +
		  '</select>', []);
		});
	  });

	  describe('should make ngModel = initial value ([b, c]) when testValue === 1 for multi-value inputs and mode = reset', function() {
		it('multiple select input', inject(function ($timeout) {
		runTest(['b', 'c'], 
		  '<select ng-model="testModel" multiple ng-reset-on="testValue === 1" mode="reset">' +
		  ' <option ng-value="a">A</option>' +
		  ' <option ng-value="b">B</option>' +
		  ' <option ng-value="c">C</option>' +
		  '</select>', ['b', 'c'], "reset", $timeout);
		}));
	  });

	  describe('test with ui-select and mode = clean (undefined)', function () {
		it('multiple', function() {    
			var template = '<ui-select multiple ng-model="testModel" ng-reset-on="testValue === 1">' +
			  '  <ui-select-match>{{$select.selected}}</ui-select-match>' +
			  '  <ui-select-choices repeat="op in [\'a\', \'b\', \'c\'] track by $index">' +
			  '    <div ng-bind-html="op"></div>' +
			  '  </ui-select-choices>' +
			  '</ui-select>';

			var expected = ['a', 'c'];
			$scope.testModel = expected;
			
			$scope.testValue = 0;
			
			var uiSelect = angular.element(template);
			$compile(uiSelect)($scope);
			$scope.$digest();
			
			var uiSelectController = uiSelect.controller('uiSelect')
			$scope = uiSelect.isolateScope() || uiSelect.scope();
			
			expect(uiSelectController.selected.length).toEqual(2);
			expect(uiSelectController.selected).toEqual(expected);
			
			$scope.testValue = 1;
			$scope.$digest();
			
			expect($scope.testModel).toEqual([]);
			expect(uiSelectController.selected.length).toEqual(0);
		});
	  });

	  describe('test with ui-select and mode = reset', function () {
		it('multiple', inject(function($timeout) {    
			var template = '<ui-select multiple ng-model="testModel" ng-reset-on="testValue === 1" mode="reset">' +
			  '  <ui-select-match>{{$select.selected}}</ui-select-match>' +
			  '  <ui-select-choices repeat="op in [\'a\', \'b\', \'c\'] track by $index">' +
			  '    <div ng-bind-html="op"></div>' +
			  '  </ui-select-choices>' +
			  '</ui-select>';

			var expected = ['a', 'c'];
			$scope.testModel = expected;
			
			$scope.testValue = 0;
			
			var uiSelect = angular.element(template);
			$compile(uiSelect)($scope);
			$scope.$digest();
			$timeout.flush();
			
			var uiSelectController = uiSelect.controller('uiSelect')
			$scope = uiSelect.isolateScope() || uiSelect.scope();
			
			expect(uiSelectController.selected.length).toEqual(2);
			expect(uiSelectController.selected).toEqual(expected);
			
			$scope.testValue = 0;
			$scope.$digest();
			
			$scope.testModel = ['b'];
			$scope.$digest();
			expect($scope.testModel).toEqual(['b']);
			expect(uiSelectController.selected.length).toEqual(1);
			
			$scope.testValue = 1;
			$scope.$digest();
			
			expect($scope.testModel).toEqual(expected);
			expect(uiSelectController.selected.length).toEqual(2);
		}));
	  });
  });
}());


