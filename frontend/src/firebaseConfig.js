// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAemwd-eLQiX3ZpPxEQzMghzbu0lkjazO0",

  authDomain: "smartbindemo-91627.firebaseapp.com",

  databaseURL: "https://smartbindemo-91627-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "smartbindemo-91627",

  storageBucket: "smartbindemo-91627.appspot.com",

  messagingSenderId: "1077246758290",

  appId: "1:1077246758290:web:1cc6273b21dea0c90a054b",

  measurementId: "G-4YNBGMF4XF"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app