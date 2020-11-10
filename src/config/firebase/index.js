import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDoXkurGS1faWfL2aqz4PKhFF3vFn1v7Bo",
  authDomain: "simple-notes-firebase-7fb86.firebaseapp.com",
  databaseURL: "https://simple-notes-firebase-7fb86.firebaseio.com",
  projectId: "simple-notes-firebase-7fb86",
  storageBucket: "simple-notes-firebase-7fb86.appspot.com",
  messagingSenderId: "215076209553",
  appId: "1:215076209553:web:ad792404908518d6aed030",
  measurementId: "G-6L2Y9JN662",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
