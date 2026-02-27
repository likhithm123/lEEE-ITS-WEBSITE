import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_YelqOdjbcUjbvX7hGivMqzZIwoGsIsw",
    authDomain: "ieee-its-b6c77.firebaseapp.com",
    projectId: "ieee-its-b6c77",
    storageBucket: "ieee-its-b6c77.firebasestorage.app",
    messagingSenderId: "152204483958",
    appId: "1:152204483958:web:09fd78f110a3bdaace6e57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged };
