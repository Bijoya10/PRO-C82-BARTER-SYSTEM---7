import firebase from "firebase";
require("@firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyA8pelcSnUULbimg__LpezRa03ZmIDI3rI",
  authDomain: "barterapp-44889.firebaseapp.com",
  databaseURL: "https://barterapp-44889.firebaseio.com",
  projectId: "barterapp-44889",
  storageBucket: "barterapp-44889.appspot.com",
  messagingSenderId: "537363701008",
  appId: "1:537363701008:web:bd15b49659ebf2f6279995"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();