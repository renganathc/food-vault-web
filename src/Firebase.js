import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJe4XFUe-m-sSFf5y_-9IHFLGmVE--uaQ",
  authDomain: "foodvault-76537.firebaseapp.com",
  projectId: "foodvault-76537",
  storageBucket: "foodvault-76537.firebasestorage.app",
  messagingSenderId: "458557175304",
  appId: "1:458557175304:web:f25471b0fadf6d2a7943bd",
  measurementId: "G-D5QY9P85HF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In Function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user); // User info

    const authorizedDomain = "student.nitandhra.ac.in";
    const emailDomain = result.user.email.split('@')[1];

    if (emailDomain === authorizedDomain) {
      console.log("User logged in with authorized domain:", emailDomain);
    } else {
      console.log("Unauthorized domain:", emailDomain);
      // You can sign the user out or show a message
      await signOut(auth);
      alert("You are only allowed to login with Student Mail");
    }

  } catch (error) {
    console.error(error);
  }
};

// Sign-Out Function
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error(error);
  }
};

const db = getFirestore(app);

export { auth, signInWithGoogle, logout , db};