
app.controller('AdminReportsController', ['$firebaseAuth','$http','$location', function ($firebaseAuth, $http, $location){
  var self = this;
  var auth = $firebaseAuth();
  var ctx = document.getElementById("myChart");
  var wardChart = [];
  var countChart = [];
  var allUsers = {list:[]};



  auth.$onAuthStateChanged(function(firebaseUser) {
   if (firebaseUser) {
     console.log('we are still logged in!');
     self.email = firebaseUser.email;
     // go reload idea data....
     getUserChart();
     getIdeaChart();
   } else {
     console.log('boooo');
     // redirect
     self.email = '';
    //  self.logout();
   }
  });


  getUserChart();
  getIdeaChart();

  function getUserChart() {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'GET',
      url: '/admin/userChart',
      headers: {
        id_token: idToken
      }
    }).then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        wardChart.push(response.data[i].ward);
        countChart.push(response.data[i].count)
      }

      var data = {
        datasets: [{
          data:countChart
          // [11,16,7,3,14,17,2,11,17,9,2,1,7,8]
          ,
          backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB",
            "rgb(74, 236, 110)",
            "rgb(237, 60, 65)",
            "rgb(121, 22, 113)",
            "rgb(01, 12, 153)",
            "rgb(221, 22, 13)",
            "rgb(101, 312, 53)",
            "rgb(221, 133, 133)",
            "rgb(77, 12, 153)",
          ],
          label: 'My dataset' // for legend
        }],
        labels: wardChart
      }

      new Chart(ctx, {
        data: data,
        type: "polarArea",
        options: {
          // legend:{
          //   labels: generateLabels:{ function(data)
          // }},

          // },
          defaultFontSize:90,
          display: true,
          defaultFontSize: 44,
          fontSize:44,
          title: {
            display: true,
            fontSize:44,
            text: 'Wards Chart'
          },

          elements: {
            arc: {
              borderColor: "#000000"
            }
          }
        }
      });
    });
  });
  }
  }//end of getAllUsers()


  function getIdeaChart() {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'GET',
      url: '/admin/ideaChart',
      headers: {
        id_token: idToken
      }
    }).then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        wardChart.push(response.data[i].ward);
        countChart.push(response.data[i].count)
      }

});
});
}
};


}]);
//CHRIS
