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
"use strict";

function FixedQueue(size, initialValues) {
    initialValues = initialValues || [];
    // Create the fixed queue array value.
    var queue = Array.apply(null, initialValues);
    // Store the fixed size in the queue.
    queue.fixedSize = size;
    // Add the class methods to the queue. Some of these have
    // to override the native Array methods in order to make
    // sure the queue lenght is maintained.
    queue.push = FixedQueue.push;
    queue.splice = FixedQueue.splice;
    queue.unshift = FixedQueue.unshift;
    // Trim any initial excess from the queue.
    FixedQueue.trimTail.call(queue);
    // Return the new queue.
    return queue;
}
// I trim the queue down to the appropriate size, removing
// items from the beginning of the internal array.
FixedQueue.trimHead = function () {
    // Check to see if any trimming needs to be performed.
    if (this.length <= this.fixedSize) {
        // No trimming, return out.
        return;
    }
    // Trim whatever is beyond the fixed size.
    Array.prototype.splice.call(this, 0, this.length - this.fixedSize);
};
// I trim the queue down to the appropriate size, removing
// items from the end of the internal array.
FixedQueue.trimTail = function () {
    // Check to see if any trimming needs to be performed.
    if (this.length <= this.fixedSize) {
        // No trimming, return out.
        return;
    }
    // Trim whatever is beyond the fixed size.
    Array.prototype.splice.call(this, this.fixedSize, this.length - this.fixedSize);
};
// I synthesize wrapper methods that call the native Array
// methods followed by a trimming method.
FixedQueue.wrapMethod = function (methodName, trimMethod) {
    // Create a wrapper that calls the given method.
    var wrapper = function wrapper() {
        // Get the native Array method.
        var method = Array.prototype[methodName];
        // Call the native method first.
        var result = method.apply(this, arguments);
        // Trim the queue now that it's been augmented.
        trimMethod.call(this);
        // Return the original value.
        return result;
    };
    // Return the wrapper method.
    return wrapper;
};
// Wrap the native methods.
FixedQueue.push = FixedQueue.wrapMethod("push", FixedQueue.trimHead);
FixedQueue.splice = FixedQueue.wrapMethod("splice", FixedQueue.trimTail);
FixedQueue.unshift = FixedQueue.wrapMethod("unshift", FixedQueue.trimTail);
'use strict';

var queEmotions = FixedQueue(250, []);

function loadEmotions() {
  console.log('load emotions');
  // Reference to the clicks in Firebase.
  var tblEmotions = firebase.database().ref().child('emotions');
  tblEmotions.limitToLast(5).on("child_added", function (snapshot) {
    var emotion = snapshot.val();
    addEmotionToList(emotion.emotions);
  });
  update();
}
function addEmotionToList(inEmotion) {
  console.log(inEmotion);
  queEmotions.push({ "emotions": inEmotion, "value": 1 });
  //$('#divEmotionList').prepend(inEmotion + '<br />');
}