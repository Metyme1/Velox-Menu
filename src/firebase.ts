// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaBZHSgpe_w7b_Lw3r-8g5-TerM5Unn-0",
  authDomain: "veloxmenu-c6d6c.firebaseapp.com",
  projectId: "veloxmenu-c6d6c",
  storageBucket: "veloxmenu-c6d6c.firebasestorage.app",
  messagingSenderId: "954627046601",
  appId: "1:954627046601:web:2f232a11273df8f6966118",
  measurementId: "G-CDQ76HXQ67",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
