'use strict';

App.controller('MainCtrl', function ($scope, angularFireCollection) {

  // Sync "name" with localStorage.
  if( window.localStorage ){
    $scope.userName = localStorage.getItem( 'user-name' ) || '';
    $scope.$watch( 'userName', function( newValue ){
      localStorage.setItem( 'user-name', newValue );
    });
  }

  var today = (new Date).toISOString().substr(0,10);
  var fireRef = new Firebase( 'https://xiawucha.firebaseio.com/orderlists/' + today );
  $scope.list = angularFireCollection( fireRef, $scope, "list", {} );

  $scope.doOrder = function(){

    for(var i = $scope.list.length; i--; ){
      if($scope.list[i]['name'] == $scope.userName){
        $scope.list[i].$ref.child('want').set($scope.userWant);
        $scope.userWant = '';
        return false;
      }
    }

    $scope.list.add({
      name: $scope.userName,
      want: $scope.userWant
    });
    $scope.userWant = '';
    return false;
  };
});
