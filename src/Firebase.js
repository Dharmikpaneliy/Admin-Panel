// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDyhy9pbux9_ixM5fx0hE7KIZX8MofZjAE",
  authDomain: "cityhospital-94d8a.firebaseapp.com",
  projectId: "cityhospital-94d8a",
  storageBucket: "cityhospital-94d8a.appspot.com",
  messagingSenderId: "719458527528",
  appId: "1:719458527528:web:d650b153143a22e100081d",
  measurementId: "G-2JFQG60CXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
