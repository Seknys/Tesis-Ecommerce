import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// require("dotenv").config();

// const firebaseConfig: FirebaseOptions = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MEESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

//FIX ME: This is a temporary fix for the firebase config issue
const firebaseConfig = {
  apiKey: "AIzaSyA0ErYbWTssIoyv73Dq4j7DqX8sJWpgOlI",
  authDomain: "ecommerce-tesis.firebaseapp.com",
  databaseURL: "https://ecommerce-tesis-default-rtdb.firebaseio.com",
  projectId: "ecommerce-tesis",
  storageBucket: "ecommerce-tesis.appspot.com",
  messagingSenderId: "903478974837",
  appId: "1:903478974837:web:71ce50e1fb8369df765b3c",
  measurementId: "G-DPNQ8HCHPG",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
