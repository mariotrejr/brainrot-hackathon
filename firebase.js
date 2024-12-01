import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY_CPNOmKw-xszGx5dH69-JUIBigETT94",
  authDomain: "wercooked-dc82f.firebaseapp.com",
  projectId: "wercooked-dc82f",
  storageBucket: "wercooked-dc82f.firebasestorage.app",
  messagingSenderId: "683043499072",
  appId: "1:683043499072:web:fd48b0750d60f3c1c343a5",
  measurementId: "G-PJ9R2LDH59",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
