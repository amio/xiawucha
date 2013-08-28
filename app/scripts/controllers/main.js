'use strict';

App.controller('MainCtrl',
 function ($scope, angularFireCollection) {

  $scope.newItem = {
    name: '',
    desc: ''
  };

  // Sync "name" with localStorage.
  if(window.localStorage){
    $scope.newItem.name = localStorage.getItem('user-name') || '';
    $scope.$watch('newItem.name',function(newValue){
      localStorage.setItem('user-name',newValue);
    });
  }

  var fireRef = new Firebase('https://amio.firebaseio.com/list');
  $scope.list = angularFireCollection( fireRef.limit(50), $scope, "list", [] );

  $scope.addOne = function(newItem){
    $scope.list.add({
      name: newItem.name,
      desc: newItem.desc
    });
    newItem.desc = '';
    return false;
  };
});
