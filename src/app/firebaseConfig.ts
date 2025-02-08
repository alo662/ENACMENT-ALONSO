// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAv3_DFOMJIEjbJbtt2XTLCxDl-F_AfbxE",
  authDomain: "enacment-prueba.firebaseapp.com",
  projectId: "enacment-prueba",
  storageBucket: "enacment-prueba.firebasestorage.app",
  messagingSenderId: "478988758445",
  appId: "1:478988758445:web:97e54e8d524efda0a2c524",
  measurementId: "G-X9F53P6QZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
