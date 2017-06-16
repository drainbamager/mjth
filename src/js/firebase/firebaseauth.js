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