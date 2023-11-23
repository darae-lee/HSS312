// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgNzkfFo8_eVTMLD1CpbAJI_7g3TSbXZw",
  authDomain: "hss312.firebaseapp.com",
  projectId: "hss312",
  storageBucket: "hss312.appspot.com",
  messagingSenderId: "114882351980",
  appId: "1:114882351980:web:010eb40a4f0aebb8355949",
  measurementId: "G-HF76L07PC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const dbService = getFirestore(app);