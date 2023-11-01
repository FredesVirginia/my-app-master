importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyA_CE84Bo8bies8EjQwhzCMYaPBwqIFHjY",
    authDomain: "firefise-shooping.firebaseapp.com",
    projectId: "firefise-shooping",
    storageBucket: "firefise-shooping.appspot.com",
    messagingSenderId: "208414627162",
    appId: "1:208414627162:web:4601b305106d94df1d8f63",
    measurementId: "G-5S463MWX1P"
  };

  firebaseConfig.initializedApp(firebaseConfig);
  const messaging = firebase.messaging();

  


