// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQN29q_yGV2x8ua1sRFfPxyzkvV-xqjpg",
  authDomain: "filmyverse-95779.firebaseapp.com",
  projectId: "filmyverse-95779",
  storageBucket: "filmyverse-95779.appspot.com",
  messagingSenderId: "367202042743",
  appId: "1:367202042743:web:30871102d166cf9f3dd772",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const collectionmovies = collection(database, "movies");
export const collectionusers = collection(database, "Users");
export const collectionSubscription = collection(database, "Subscription");
export const Authentication = getAuth(app);

