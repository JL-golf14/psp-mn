app.controller('Subtopic2Controller', ['DataFactory', '$firebaseAuth','$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){

  var self = this;

  self.subtopicIdeas2 = DataFactory.subtopicIdeas2;


//redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }

//get moreComments button click
  self.moreComments = function() {
    console.log('comments clicked');
    $location.path('/comment');
  }



















}]);
