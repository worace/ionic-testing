angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SessionsCtrl', function($scope, Session) {
  $scope.sessions = Session.query();
})

.controller('SessionCtrl', function($scope, $stateParams, Session) {
  $scope.session = Session.get({sessionId: $stateParams.sessionId});
})

.controller('NewRoomCtrl', function($scope, Room) {
  $scope.topics = [{"id":1,"prompt":"BuzzFeed's Top Hungry Academy Grads","created_at":"2015-06-03T01:06:13.977Z","updated_at":"2015-06-03T01:06:13.977Z"}];
  $scope.selectTopic = function(topic) {
    console.log(topic);
    var room = new Room({topic_id: topic.id});
    room.$save(function(room, headers) {
      console.log("got back room: ", room);
      console.log("got back headers: ", headers);
    });
  };
})

.controller('SplashCtrl', function($scope, Session) {
});
