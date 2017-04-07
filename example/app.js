var app = angular.module('testResetOn', ['ui.select', 'ngSanitize', 'ng-reset-on']);

app.controller('MainCtrl', function() {
  var ctrl = this;
  ctrl.model = {};
  ctrl.selection = null;
  ctrl.mode = "reset";
  
  ctrl.resetForm = function(){
    ctrl.model.field1 = "text here...";
    ctrl.model.field2 = true;
    ctrl.model.field3 = "B";
    ctrl.model.field4 = false;
    ctrl.model.field5 = ["y","z"];
    ctrl.model.fieldSelectSimple = "Brazil";
    ctrl.model.fieldSelectMultiple = ["Green", "Yellow"];
  };
  
  ctrl.countries = ["Brazil", "United States", "Argentina", "Ecuador", "Colombia"];
  ctrl.colors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
  
  ctrl.resetForm();
});
