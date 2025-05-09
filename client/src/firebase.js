
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKc_EPOzidpJZKeJmeSn1ojZQVjfjmg0E",
  authDomain: "elpeapgroup.firebaseapp.com",
  projectId: "elpeapgroup",
  storageBucket: "elpeapgroup.firebasestorage.app",
  messagingSenderId: "811808895207",
  appId: "1:811808895207:web:8544c00f400392e83cb242",
  measurementId: "G-F0C4YGC5V9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage };
