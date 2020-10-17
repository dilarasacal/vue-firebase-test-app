import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDqIRQBDHVDImS5-eO3CQQY-YNqTc683zc",
    authDomain: "vue-test-app-953b7.firebaseapp.com",
    databaseURL: "https://vue-test-app-953b7.firebaseio.com",
    projectId: "vue-test-app-953b7",
    storageBucket: "vue-test-app-953b7.appspot.com",
    messagingSenderId: "827371926851",
    appId: "1:827371926851:web:f9a9b1b3f870206ea02bf6",
    measurementId: "G-4Q7K8K1GNS"
  };
  // Initialize Firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export const db = firebaseApp.database()