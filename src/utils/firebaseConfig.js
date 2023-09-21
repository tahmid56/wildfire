// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJWjgXA_vud684_JPggUHlA178VdetqeQ",
    authDomain: "wildfire-47279.firebaseapp.com",
    projectId: "wildfire-47279",
    storageBucket: "wildfire-47279.appspot.com",
    messagingSenderId: "1003413195775",
    appId: "1:1003413195775:web:e9820255ac82f6eb34b5ca"
  };

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()