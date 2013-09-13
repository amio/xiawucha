'use strict';

function xwcMainCtrl ($scope, angularFireCollection) {

  // Sync "name" with localStorage.
  if( window.localStorage ){
    $scope.userName = localStorage.getItem( 'user-name' ) || '';
    $scope.$watch( 'userName', function( newValue ){
      localStorage.setItem( 'user-name', newValue );
    });
  }else{
    $scope.userName = '';
  }

  var timeOffset = 1000*60*(new Date()).getTimezoneOffset();
  var todayNum = Math.floor( (Date.now() - timeOffset) / (1000*60*60*24) );
  var fireRef = new Firebase( 'https://xiawucha.firebaseio.com/orderlists/' + todayNum );
  $scope.list = angularFireCollection( fireRef, $scope, 'list', {} );

  $scope.doOrder = function(){

    for(var i = $scope.list.length; i--; ){
      if($scope.list[i].name === $scope.userName){
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

  $scope.setDesc = function(item){
    $scope.userWant = item.want;
  };
}
