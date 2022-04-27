// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_PTSjr1_TJLN_sPt5itko2byrLEzWJ0s",
  authDomain: "proyectofinal-programacionweb.firebaseapp.com",
  projectId: "proyectofinal-programacionweb",
  storageBucket: "proyectofinal-programacionweb.appspot.com",
  messagingSenderId: "449344273800",
  appId: "1:449344273800:web:28ea6039f646dd7a8f4e3d"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;