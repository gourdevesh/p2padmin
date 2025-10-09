// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyDp5rzbb21-eF3R-P0di4zmLp6eHpy-VwA",
//     authDomain: "onnbitnew.firebaseapp.com",
//     databaseURL: "https://onnbitnew-default-rtdb.firebaseio.com",
//     projectId: "onnbitnew",
//     storageBucket: "onnbitnew.firebasestorage.app",
//     messagingSenderId: "302017664970",
//     appId: "1:302017664970:web:81161bb94f9e59e933e133",
//     measurementId: "G-71Y2YFBDFN"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAaoab1uf_atxZYY_ooIOqxiNJ5LLBbvqI",
  authDomain: "onnbit-249c8.firebaseapp.com",
  projectId: "onnbit-249c8",
  storageBucket: "onnbit-249c8.firebasestorage.app",
  messagingSenderId: "363004121869",
  appId: "1:363004121869:web:6f374ff99ced91bfbe9644",
  measurementId: "G-QJWWH74HL4"
};




const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { db, messaging };
