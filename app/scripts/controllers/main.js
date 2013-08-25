'use strict';

App.controller('MainCtrl',
 function ($scope, angularFireCollection) {
  $scope.newItem = {
    desc: ''
  };

  var fireRef = new Firebase('https://amio.firebaseio.com/list');
  $scope.list = angularFireCollection( fireRef.limit(50), $scope, "list", [] );

  $scope.addOne = function(newItem){
    console.log(1);
    $scope.list.add({
      name: newItem.name,
      desc: newItem.desc
    });
    newItem.desc = '';
    return false;
  };
});
