// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//Nếu hêt hạn thì vào firebase để lấy lại
const firebaseConfig = {
  apiKey: "AIzaSyAdbHM-3d0lvwpBogaMK_xoAjY94Ykou4Q",
  authDomain: "opt3-project.firebaseapp.com",
  projectId: "opt3-project",
  storageBucket: "opt3-project.appspot.com",
  messagingSenderId: "611642502609",
  appId: "1:611642502609:web:016b761139dde0c434c4f0",
  measurementId: "G-GTDZLV6K51"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
