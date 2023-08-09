// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARKt-iSoHl87aKYi2JTN9fpo__l3C2bOA",
  authDomain: "wildfire-7ce11.firebaseapp.com",
  projectId: "wildfire-7ce11",
  storageBucket: "wildfire-7ce11.appspot.com",
  messagingSenderId: "337574566826",
  appId: "1:337574566826:web:90db3565fd0f64f61b29d3"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()