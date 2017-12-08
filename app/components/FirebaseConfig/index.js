import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBIf4cfD1zWQPE0NKntvVwFWQ4_B2WbVDA",
    authDomain: "demostadium.firebaseapp.com",
    databaseURL: "https://demostadium.firebaseio.com",
    projectId: "demostadium",
    storageBucket: "demostadium.appspot.com",
    messagingSenderId: "1069509299426"
  };
export const firebaseApp = firebase.initializeApp(config);