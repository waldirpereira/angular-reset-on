var app = angular.module('testResetOn', ['ng-reset-on']);

app.controller('MainCtrl', function($scope) {
  $scope.resetForm = function(){
    $scope.field1 = "text here...";
    $scope.field2 = true;
    $scope.field3 = "B";
    $scope.field4 = false;
    $scope.field5 = ["y","z"];
  }
  
  $scope.resetForm();
});
