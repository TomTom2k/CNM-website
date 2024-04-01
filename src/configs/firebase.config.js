// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//Nếu hêt hạn thì vào firebase để lấy lại
const firebaseConfig = {
  apiKey: "AIzaSyDr_UQ3g63ZuKtQS19XGkxTcj2CJz4g_mo",
  authDomain: "opt-chat-project.firebaseapp.com",
  projectId: "opt-chat-project",
  storageBucket: "opt-chat-project.appspot.com",
  messagingSenderId: "277713092250",
  appId: "1:277713092250:web:0d2715c9eb54c477ce2923",
  measurementId: "G-XSE4PQSP34"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
