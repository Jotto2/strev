import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAitqQFn16ZtuqydOAG-VVcI_ug3snmfrg",
    authDomain: "strev-49adf.firebaseapp.com",
    projectId: "strev-49adf",
    storageBucket: "strev-49adf.appspot.com",
    messagingSenderId: "646838642637",
    appId: "1:646838642637:web:71a760943adfbd04630684",
    measurementId: "G-DHN0Z3F808"
  };
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();