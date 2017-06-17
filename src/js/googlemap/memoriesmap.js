        var map;
       function initMap() {
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
       }
          var config = {
            apiKey: "AIzaSyBhodCUY9cJN_g_78a3fVXeB4ypjEe4GgY",
            authDomain: "dj2017-2804f.firebaseapp.com",
            databaseURL: "https://dj2017-2804f.firebaseio.com",
            projectId: "dj2017-2804f",
            storageBucket: "",
            messagingSenderId: "994859069594"
          };
          firebase.initializeApp(config);
          var database = firebase.database();
         function initAuthentication(onAuthSuccess) {
          firebase.authAnonymously(function(error, authData) {
            if (error) {
              console.log('Login Failed!', error);
            } else {
              data.sender = authData.uid;
              onAuthSuccess();
            }
          }, {remember: 'sessionOnly'});  // Users will get a new id for every session.
        }

/**
      * Starting point for running the program. Authenticates the user.
      * @param {function()} onAuthSuccess - Called when authentication succeeds.
      */
      function initAuthentication(onAuthSuccess) {
        firebase.authAnonymously(function(error, authData) {
          if (error) {
            console.log('Login Failed!', error);
          } else {
            data.sender = authData.uid;
            onAuthSuccess();
          }
        }, {remember: 'sessionOnly'});  // Users will get a new id for every session.
      }
// Create a heatmap.
        var heatmap = new google.maps.visualization.HeatmapLayer({
          data: [],
          map: map,
          radius: 16
        });

        initAuthentication(initFirebase.bind(undefined, heatmap));
  function initFirebase(heatmap) {
          // 10 minutes before current time.
          var startTime = new Date().getTime() - (1000 * 60 * 60 * 24 * 30);//Get data for last 1 month

          // Reference to the clicks in Firebase.
          var clicks = firebase.database().ref().child('clicks');

          // Listener for when a click is added.
          clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
            function(snapshot) {

              // Get that click from firebase.
              var newPosition = snapshot.val();
              var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
              var elapsed = new Date().getTime() - newPosition.timestamp;

              // Add the point to  the heatmap.
              heatmap.getData().push(point);
            }
          );
        }
