import firebase from "firebase";
require("@firebase/firestore");
var firebaseConfig = {

  apiKey: "AIzaSyDGqQBleOp6dON-OWuXXrnz5QFzyPaZtsU",
    authDomain: "booksanta-826a1.firebaseapp.com",
    projectId: "booksanta-826a1",
    storageBucket: "booksanta-826a1.appspot.com",
    messagingSenderId: "716398074506",
    appId: "1:716398074506:web:9eb28b059d358303ab2b73",
 
  databaseURL: "https://booksanta-826a1.firebaseio.com",
  
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();