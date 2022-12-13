// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCS7dlm0sBnBPI22QaI3j_fAhw28mFJpSw",
  authDomain: "mirats-fulcrum.firebaseapp.com",
  databaseURL: "https://mirats-fulcrum.firebaseio.com",
  projectId: "mirats-fulcrum",
  storageBucket: "mirats-fulcrum.appspot.com",
  messagingSenderId: "759155739902",
  appId: "1:759155739902:web:a3b07292126dd4e6c429af",
  measurementId: "G-ZRXJL491DX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestoredb = getFirestore(app);
