angular.module('starter.services', ['ngResource'])
.factory('Session', function ($resource) {
  return $resource('http://localhost:5000/sessions/:sessionId');
})
.factory('Room', function ($resource) {
  return $resource('http://localhost:3000/rooms/:roomId.json');
})
.factory('RoundGuess', function($resource){
   return $resource('http://localhost:3000/rounds/:roundId/guesses.json?guess=:guess', {roundId:'@roundId', guess:'@guess'})
})
.factory('Topic', function($resource){
  return $resource('http://localhost:3000/topics/:topicId.json');
})
