function addToFirebase(e){getTimestamp(function(a){e.timestamp=a;firebase.database().ref().child("clicks").push(e,function(e){e&&console.warn(e)})})}function getTimestamp(e){var a=firebase.database().ref().child("last_message/"+data.sender);a.onDisconnect().remove(),a.set(firebase.database.ServerValue.TIMESTAMP,function(n){n?console.log(n):a.once("value",function(a){e(a.val())},function(e){console.warn(e)})})}
function initAuthentication(e){firebase.authAnonymously(function(a,i){a?console.log("Login Failed!",a):(data.sender=i.uid,e())},{remember:"sessionOnly"})}var config={apiKey:"AIzaSyBhodCUY9cJN_g_78a3fVXeB4ypjEe4GgY",authDomain:"dj2017-2804f.firebaseapp.com",databaseURL:"https://dj2017-2804f.firebaseio.com",projectId:"dj2017-2804f",storageBucket:"",messagingSenderId:"994859069594"};firebase.initializeApp(config);var database=firebase.database();
function initMap(){map=new google.maps.Map(document.getElementById("map"),mapOptions),map.addListener("click",function(o){console.log("click"),data.lat=o.latLng.lat(),data.lng=o.latLng.lng(),addToFirebase(data);new google.maps.Marker({position:o.latLng,map:map});$("#modGetEmotion").modal("show")})}function resetPage(){reSortEmotion(),$("#txtMyEmotion").val(""),initMap()}function reSortEmotion(){for(var o=[],t=0;t<arrEmotions.length;t++){var n={emotion:null,rank:null},a=Math.random();n.emotion=arrEmotions[t],n.rank=a,o.push(n)}o.sort(compareEmotionRank);for(var t=0,e=7;t<e;t++){var i=t+1;$("#btnEmotion"+i).html(o[t].emotion)}}function compareEmotionRank(o,t){const n=o.rank,a=t.rank;var e=0;return n>a?e=1:n<a&&(e=-1),e}function startCounter(){var o=5;id=setInterval(function(){console.log(o),o--,o<0?clearInterval(id):$("#spCounter").html(o.toString())},1e3)}var map,data={sender:null,timestamp:null,lat:null,lng:null},mapOptions={center:new google.maps.LatLng(10,0),zoom:3},arrEmotions=["Happy","Thankful","Proud","Joy","Admiring","Humble","Gracious","Grateful","Blissful","Optimistic","Thrilled","Wonderful","Motivated","Exhilarated","Loved","Youthful","Inspired","Hopeful","Motivated","Honored","Privileged","Good","Comfortable","Blessed","Uplifted","Smiling","Supported"];$("#modGetEmotion").on("hidden.bs.modal",function(o){resetPage()}),$("#btnCloseModal").on("click",function(o){$("#modGetEmotion").modal("hide"),$("#modConfirmation").modal("show"),startCounter(),setTimeout(function(){$("#modConfirmation").modal("hide")},5e3)}),resetPage();