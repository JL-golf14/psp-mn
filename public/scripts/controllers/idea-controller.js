
app.controller('IdeaController', ['DataFactory', '$firebaseAuth', '$location', function(DataFactory, $firebaseAuth, $location) {
//CHRIS’S CODE STARTS HERE

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();

  self.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
      self.redirectHome();
    });
  };

  // function to redirect user to home page after logout
  self.redirectHome = function(){
    $location.url('/home');
  }

//redirect to home view
  function homeView() {
    $location.path('/home');
  }//end of homeView()
//current subtopics for select option
  self.subTopicObject = DataFactory.subTopicObject;
//all user email and id
var userMatchObject = DataFactory.userMatchObject.list;
//function adds new idea to DB
  self.addNewIdea = function(idea) {
//sources firebaseUser in the function
    var firebaseUser = auth.$getAuth();
//container to loop id's through
    var id = "";
//loops through all users email to find correct id
      for (var i = 0; i < userMatchObject.length; i++) {
        if (userMatchObject[i].email == firebaseUser.email) {
          var id = userMatchObject[i].id;
        }//end of if
      };//end of for loop
//name and email is added to object
    var newIdea = {
      name : firebaseUser.displayName,
      email : firebaseUser.email,
      subtopicId : idea.subtopicId,
      title : idea.title,
      description : idea.description,
      id : id
    }
//sents object to factory
    DataFactory.addNewIdea(newIdea);
//empties inputs on submit
    self.idea = {};
//redirect after submit
    homeView();
  };//end of addNewIdea()

//CHRIS’S CODE ENDS HERE
}]);//end of app.controller()




// var auth = $firebaseAuth();
//
//
// auth.$onAuthStateChanged(getUser);
//
// //populates user profile information on page load
// function getUser(){
//   var firebaseUser = auth.$getAuth();
//   if(firebaseUser) {
//     firebaseUser.getToken().then(function(idToken){
//       $http({
//         method: 'GET',
//         url: '/data/user',
//         headers: {
//           id_token: idToken
//         }
//       }).then(function(response){
//         self.userProfile = response.data;
//         console.log(self.userProfile);
//
//       })
//     })
//   } else {
//     console.log('Not logged in or not authorized.');
//   }
// };
//
//
// function getIdea(){
//   var firebaseUser = auth.$getAuth();
//   if(firebaseUser) {
//     firebaseUser.getToken().then(function(idToken){
//       $http({
//         method: 'GET',
//         url: '/data/idea',
//         headers: {
//           id_token: idToken
//         }
//       }).then(function(response){
//         self.idea = response.data;
//       })
//     })
//   } else {
//     console.log('Not logged in or not authorized.');
//   }
// };
