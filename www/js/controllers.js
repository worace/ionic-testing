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
.controller('RoomCtrl', function($scope, Room, RoundGuess, RecommendedTopic, RoomRound, $stateParams) {
  $scope.room = Room.get({roomId: $stateParams.roomSlug});
  $scope.recommendedTopics = RecommendedTopic.query({roomId: $stateParams.roomSlug});
  $scope.attemptGuess = function() {
    var guess = new RoundGuess({ roundId: $scope.room.current_round.id, guess: this.guess });
    var form = this;
    guess.$save(function(data, headers) {
      $scope.room = data.room;
      $scope.message = data.message;
      form.guess = "";
      if($scope.room.current_round.state == "played") {
        $scope.recommendedTopics = RecommendedTopic.query({roomId: $stateParams.roomSlug});
      }
    });

  }

  $scope.newRoomTopic = function(topic) {
    console.log(topic)
    var newRound = new RoomRound({roomId: $stateParams.roomSlug, topicId: topic.id});
    newRound.$save(function(data,headers) {
      $scope.room = data.room;
    })
  }
})
.controller('GuessesCtrl', function($scope,$stateParams) {
  //access room id
  console.log($stateParams);
  $scope.attemptGuess = function() {
    console.log($scope.guess);
    console.log($scope.roundId);
  }
})

.controller('NewRoomCtrl', function($scope, Room, Topic, $location) {
  $scope.topics = Topic.query();
  $scope.selectTopic = function(topic) {
    var room = new Room({topic_id: topic.id});
    room.$save(function(data, headers) {
      var room = data.room
      if (room.active) {
        $location.path("/app/rooms/" + room.slug);
      } else {
        //need to go fill in q's (room/round populate)
      }
    });
  };
})

.controller('SplashCtrl', function($scope, Session) {
});
