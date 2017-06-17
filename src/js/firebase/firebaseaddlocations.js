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
        function getTimestamp(addClick) {
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
                addClick(snap.val());  // Add click with same timestamp.
              }, function(err) {
                console.warn(err);
                Raven.captureMessage('Error adding click to firebase: ' + err, {level: 'error' });
            });
        }     
      });
    }
