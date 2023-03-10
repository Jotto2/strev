import { initializeApp, getApps } from "firebase/app";
import {Firestore, getFirestore} from 'firebase/firestore';
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'; // <-- import getStorage
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAitqQFn16ZtuqydOAG-VVcI_ug3snmfrg",
  authDomain: "strev-49adf.firebaseapp.com",
  databaseURL: "https://strev-49adf-default-rtdb.firebaseio.com",
  projectId: "strev-49adf",
  storageBucket: "strev-49adf.appspot.com",
  messagingSenderId: "646838642637",
  appId: "1:646838642637:web:71a760943adfbd04630684",
  measurementId: "G-DHN0Z3F808"
};
  
// Initialize Firebase
export const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const firestoreDB = initializeFirestore(firebase_app, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line
})
export const storage = getStorage(firebase_app);