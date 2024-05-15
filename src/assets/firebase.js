// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdQogldAMwVKAJgHHzHBgGNkyJSZVN8Nk",
  authDomain: "simple-contacts-10aa2.firebaseapp.com",
  projectId: "simple-contacts-10aa2",
  storageBucket: "simple-contacts-10aa2.appspot.com",
  messagingSenderId: "583445196919",
  appId: "1:583445196919:web:700efe73f4ea60fd331672",
  measurementId: "G-RKS0T0T6EM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };

