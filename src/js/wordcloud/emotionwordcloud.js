var queEmotions = FixedQueue(250, []);

function loadEmotions() {
      console.log('load emotions');
        // Reference to the clicks in Firebase.
        var tblEmotions = firebase.database().ref().child('emotions');
        tblEmotions.limitToLast(5).on("child_added", function(snapshot){
          var emotion = snapshot.val();
          addEmotionToList(emotion.emotions);
        });
        update()
      }
  function addEmotionToList(inEmotion){
          console.log(inEmotion);
          queEmotions.push({"emotions":inEmotion, "value":1});
          //$('#divEmotionList').prepend(inEmotion + '<br />');
  }
