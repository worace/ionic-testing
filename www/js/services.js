angular.module('starter.services', ['ngResource'])

.factory('Session', function ($resource) {
  return $resource('http://localhost:5000/sessions/:sessionId');
})
.factory('Room', function ($resource) {
  return $resource('http://localhost:3000/rooms/:roomId.json');
})
