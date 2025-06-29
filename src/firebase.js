// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO8NnO9L_7_scUqDRlNvyKnxLj3y8PdA0",
  authDomain: "step-by-step-12f7d.firebaseapp.com",
  projectId: "step-by-step-12f7d",
  storageBucket: "step-by-step-12f7d.firebasestorage.app",
  messagingSenderId: "431851835568",
  appId: "1:431851835568:web:b7fd06cb9d2ad815e7eb75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);