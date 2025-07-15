// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE2QVFU9pjmy2uEQW21QiyrEkm0LpO-Jc",
  authDomain: "tripcraft-app.firebaseapp.com",
  projectId: "tripcraft-app",
  storageBucket: "tripcraft-app.firebasestorage.app",
  messagingSenderId: "321999857038",
  appId: "1:321999857038:web:117b141696ff3e827830df",
  measurementId: "G-JCTDQJPYNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Export the app instance
export default app;