// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth =getAuth(app)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-67cv_PP2_sr2Mgu-6c8dYiwf2TS8EDk",
  authDomain: "final-project-1d8f4.firebaseapp.com",
  projectId: "final-project-1d8f4",
  storageBucket: "final-project-1d8f4.firebasestorage.app",
  messagingSenderId: "389333905363",
  appId: "1:389333905363:web:d0d55251a4e8fa58dc4926",
  measurementId: "G-9V2Y6BS4GB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)