import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDopFksmj44jRTm0uEOCk245e8c-u-TksM",
  authDomain: "xuancakes.firebaseapp.com",
  projectId: "xuancakes",
  storageBucket: "xuancakes.appspot.com",
  messagingSenderId: "445980151921",
  appId: "1:445980151921:web:91ddd0d861c42b0a29cbd0",
  measurementId: "G-TGNVCDE22E",
};

  firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default};
