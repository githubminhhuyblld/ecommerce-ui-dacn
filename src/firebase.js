// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkZWTXepzZTeoAvbnXnYWqBT7UvKin5Ic",
  authDomain: "ecommerce-dacn-b0f0d.firebaseapp.com",
  projectId: "ecommerce-dacn-b0f0d",
  storageBucket: "ecommerce-dacn-b0f0d.appspot.com",
  messagingSenderId: "656126915972",
  appId: "1:656126915972:web:4218365cd1e650c9b419d1",
  measurementId: "G-W44EJCEJN1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export const storage = getStorage(app);
