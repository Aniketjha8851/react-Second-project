// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOE8w4SGH0VzfmAUrQRRRTgjepJn4AjMc",
  authDomain: "vite-contact-dc3fe.firebaseapp.com",
  projectId: "vite-contact-dc3fe",
  storageBucket: "vite-contact-dc3fe.appspot.com",
  messagingSenderId: "749297265905",
  appId: "1:749297265905:web:844eb96806ffd871718d50"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
