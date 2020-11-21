import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyC0393pBEnTTKjvkiyTp8uBLk4CZeJmJq0",
  authDomain: "remonter-de404.firebaseapp.com",
  databaseURL: "https://remonter-de404.firebaseio.com",
  projectId: "remonter-de404",
  storageBucket: "remonter-de404.appspot.com",
  messagingSenderId: "841182718434",
  appId: "1:841182718434:web:57da59f8c951f57d66b1bb"
};

firebase.initializeApp(config);

export default firebase.database();