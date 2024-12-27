// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-v1-ef6ca.firebaseapp.com",
  projectId: "twitter-v1-ef6ca",
  storageBucket: "twitter-v1-ef6ca.appspot.com",
  messagingSenderId: "297157116834",
  appId: "1:297157116834:web:4269d033c60d628279a8fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);