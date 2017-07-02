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
              Raven.captureMessage('Error loggin on to firebase: ' + error, {level: 'error' });

            } else {
              data.sender = authData.uid;
              onAuthSuccess();
            }
          }, {remember: 'sessionOnly'});  // Users will get a new id for every session.
        }
        function addToFirebase(data) {
          getTimestamp(function(timestamp) {
            data.timestamp = timestamp;
            var ref = firebase.database().ref().child('clicks').push(data, function(err) {
              if (err) {  // Data was not written to firebase.
                console.warn(err);
                Raven.captureMessage('Error adding to firebase: ' + err, {level: 'error' });
                  }
              });
          });
        }        
        function addEmotionToFirebase(data) {
          var arrWords = data.emotions.split(" ");
            for (var intTempCounter = 0; intTempCounter < arrWords.length; intTempCounter++) {
              var strWord = arrWords[intTempCounter];
              var intInnerCounter = intTempCounter;
              getTimestamp(function(timestamp, inWord) {
              data.timestamp = timestamp;
              console.log(inWord);
              var ref = firebase.database().ref().child('emotions').push(inWord, function(err) {
                if (err) {  // Data was not written to firebase.
                  console.warn(err);
                  Raven.captureMessage('Error adding emotion to firebase: ' + err, {level: 'error' });
                    }
                });
            }, strWord);
          }
        };
        function getTimestamp(addClick, inParam1, inParam2) {
          // Reference to location for saving the last click time.
          var ref = firebase.database().ref().child('last_message/' + data.sender);

          ref.onDisconnect().remove();  // Delete reference from firebase on disconnect.

          // Set value to timestamp.
          ref.set(firebase.database.ServerValue.TIMESTAMP, function(err) {
            if (err) {  // Write to last message was unsuccessful.
              console.log(err);
              Raven.captureMessage('Error writing last message to firebase: ' + err, {level: 'error' });
            } else {  // Write to last message was successful.
              ref.once('value', function(snap) {
                addClick(snap.val(), inParam1, inParam2);  // Add click with same timestamp.
              }, function(err) {
                console.warn(err);
                Raven.captureMessage('Error adding click to firebase: ' + err, {level: 'error' });
            });
        }     
      });
    }

var map;
var data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
};
var arrEmotions = ['Happy', 'Thankful', 'Proud', 'Joy', 'Admiring', 'Humble', 'Gracious', 'Grateful', 'Blissful', 'Optimistic', 'Thrilled', 'Wonderful', 'Motivated', 'Exhilarated', 'Loved', 'Youthful', 'Inspired', 'Hopeful', 'Motivated', 'Honored', 'Privileged', 'Good', 'Comfortable', 'Blessed', 'Uplifted', 'Smiling', 'Supported'];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), { center: new google.maps.LatLng(10, 0), zoom: 2 });
    map.addListener('click', function (e) {
        data.lat = e.latLng.lat();
        data.lng = e.latLng.lng();
        addToFirebase(data);
        var marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        $('#modGetEmotion').modal('show');
    });
}
function setupPage() {
    reSortEmotion();
    $('#txtMyEmotion').val('');
    $( ".MJTHEmotion" ).each(function( index ) {
      if($(this).hasClass('active')){
        $(this).removeClass('active');
      }
    });    
    initMap();
}
function reSortEmotion() {
    var arrEmotionRank = [];
    for (var i = 0; i < arrEmotions.length; i++) {
        var objEmotionRank = { emotion: null, rank: null };
        var lgRank = Math.random();
        objEmotionRank.emotion = arrEmotions[i];
        objEmotionRank.rank = lgRank;
        arrEmotionRank.push(objEmotionRank);
    }
    arrEmotionRank.sort(compareEmotionRank);
    for (var i = 0, len = 7; i < len; i++) {
        var strButtonID = i + 1;
        $('#btnEmotion' + strButtonID).html(arrEmotionRank[i].emotion);
    }
}
function compareEmotionRank(a, b) {
    // Use toUpperCase() to ignore character casing
    const genreA = a.rank;
    const genreB = b.rank;

    var comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}
$('#modGetEmotion').on('hidden.bs.modal', function (e) {
    setupPage();
})
$('#btnCloseModal').on('click', function (e) {
    $('#modGetEmotion').modal('hide');
    $('#modConfirmation').modal('show');
    var strEmotion = $('#txtMyEmotion').val();
    var strEmotionList = $('#txtEmotions').val();
    strEmotionList  = strEmotionList + ' ' + strEmotion;
    $('#txtEmotions').val('');
    $('#txtMyEmotion').val('');
    strEmotionList = $.trim(strEmotionList);
    if (strEmotionList.length > 0){
        addEmotionToFirebase({timestamp:'',emotions:strEmotionList})
    }
    startCounter();
    setTimeout(function () { $('#modConfirmation').modal('hide'); }, 5000);
});


$('.MJTHEmotion').on('click', function (e) {
    var strEmotion = $(this).text();
    var strEmotionList = $('#txtEmotions').val();
    if ($(this).hasClass('active').toString()=='true'){//If going from active to inactive
        strEmotionList = strEmotionList.replace(strEmotion, '');
    }
    else{//If going from inactive to active
        strEmotionList = strEmotionList + ' ' + strEmotion;
    }
    $('#txtEmotions').val(strEmotionList);
});

function startCounter() {
    var counter = 5;
    id = setInterval(function () {
        counter--;
        if (counter < 0) {
            clearInterval(id);
        } else {
            $('#spCounter').html(counter.toString());
        }
    }, 1000);
}
setupPage();