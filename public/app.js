var myApp = angular.module('myApp', []);

myApp.directive('myAutoComplete', function(){
    return {
        restrict : 'EA',
        scope : {
            label : "@",
            selectedItem : "=",
            options: "="
        },
        templateUrl : '/MyAutoComplete.html',
        //template : '<div>    <span>{{label}} : </span><input ng-model="selectedItem"></input></div>'
        link : function(scope, element, attrs){
            scope.showList = false;
           scope.selectItem = function(event, args){               
               scope.selectedItem = angular.copy(this.item);
               scope.showList = false;
           }

           element.on('keyup', function(e, args, ele){
               if(!scope.showList){
                    scope.showList = true;                    
                }
                if(!$('.autoComplete-input').val()){
                    scope.selectedItem = {};
                }
                scope.$apply();          
           });
                      
        }
    };
});

myApp.controller('myController', function ($scope, $http) {
    $scope.someMovies = [{Id:1, Value:"The Wolverine"}, 
                       {Id:2, Value:"The Smurfs 2"}, 
                       {Id:3, Value:"The Mortal Instruments: City of Bones"}];
    
    $scope.selectedMovie = {};
        
});    