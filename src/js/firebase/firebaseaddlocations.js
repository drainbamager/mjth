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
