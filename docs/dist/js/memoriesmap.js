"use strict";

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
  firebase.authAnonymously(function (error, authData) {
    if (error) {
      console.log('Login Failed!', error);
      Raven.captureMessage('Error loggin on to firebase: ' + error, { level: 'error' });
    } else {
      data.sender = authData.uid;
      onAuthSuccess();
    }
  }, { remember: 'sessionOnly' }); // Users will get a new id for every session.
}
'use strict';

var map;
function setupPage() {
  initMap();
}
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(10, 0),
    zoom: 2
  });
  // Create a heatmap.
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: [],
    map: map,
    radius: 16
  });
  initFirebase(heatmap);
}
function initFirebase(heatmap) {

  // 10 minutes before current time.
  var startTime = new Date(2016, 5, 10).getTime(); //Note month is 0index based

  // Reference to the clicks in Firebase.
  var clicks = firebase.database().ref().child('clicks');

  // Listener for when a click is added.
  clicks.orderByChild('timestamp').startAt(startTime).on('child_added', function (snapshot) {

    // Get that click from firebase.
    var newPosition = snapshot.val();
    var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
    var elapsed = new Date().getTime() - newPosition.timestamp;

    // Add the point to  the heatmap.
    heatmap.getData().push(point);
  });

  // Remove old data from the heatmap when a point is removed from firebase.
  clicks.on('child_removed', function (snapshot, prevChildKey) {
    var heatmapData = heatmap.getData();
    var i = 0;
    while (snapshot.val().lat != heatmapData.getAt(i).lat() || snapshot.val().lng != heatmapData.getAt(i).lng()) {
      i++;
    }
    heatmapData.removeAt(i);
  });
}
setupPage();