"use strict";function xwcMainCtrl($scope,angularFireCollection){window.localStorage&&($scope.userName=localStorage.getItem("user-name")||"",$scope.$watch("userName",function(newValue){localStorage.setItem("user-name",newValue)}));var timeOffset=6e4*(new Date).getTimezoneOffset(),todayNum=Math.floor((Date.now()-timeOffset)/864e5),fireRef=new Firebase("https://xiawucha.firebaseio.com/orderlists/"+todayNum);$scope.list=angularFireCollection(fireRef,$scope,"list",{}),$scope.doOrder=function(){for(var i=$scope.list.length;i--;)if($scope.list[i].name===$scope.userName)return $scope.list[i].$ref.child("want").set($scope.userWant),$scope.userWant="",!1;return $scope.list.add({name:$scope.userName,want:$scope.userWant}),$scope.userWant="",!1},$scope.setDesc=function(item){$scope.userWant=item.want}}var xwc=angular.module("xwc",["firebase"]);xwc.config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"views/main.html",controller:"xwcMainCtrl"}).otherwise({redirectTo:"/"})}]);