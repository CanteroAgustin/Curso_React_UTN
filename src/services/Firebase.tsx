// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB2SefZO41_56JRdcOSaJlMvTvg5Up4bg",
  authDomain: "wikirickandmorty.firebaseapp.com",
  projectId: "wikirickandmorty",
  storageBucket: "wikirickandmorty.appspot.com",
  messagingSenderId: "188315722633",
  appId: "1:188315722633:web:decb94578831a98894b758"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
