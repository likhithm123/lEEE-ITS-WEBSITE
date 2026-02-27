import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzCbPB4SF5FqQ2ljMj8tVPIYhqky6OW4Y",
    authDomain: "ieeeits.firebaseapp.com",
    projectId: "ieeeits",
    storageBucket: "ieeeits.firebasestorage.app",
    messagingSenderId: "421183044788",
    appId: "1:421183044788:web:1a72ca50b3f4dfa7802be1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged };
