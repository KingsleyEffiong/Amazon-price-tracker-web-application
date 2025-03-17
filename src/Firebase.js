import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_lIXtRunIXYAsxWorkoa8Ye-na3q4St0",
  authDomain: "product-price-tracker-2a820.firebaseapp.com",
  projectId: "product-price-tracker-2a820",
  storageBucket: "product-price-tracker-2a820.appspot.com",
  messagingSenderId: "393984202945",
  appId: "1:393984202945:web:2900ee0ab814c2f62f1c40",
};

// 🔹 Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
