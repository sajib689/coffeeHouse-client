import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAyI9aWH26b2EZ4v_4CGx0ny4SZ2gOCIW8",
  authDomain: "simple-firebase-authenti-e0356.firebaseapp.com",
  projectId: "simple-firebase-authenti-e0356",
  storageBucket: "simple-firebase-authenti-e0356.firebasestorage.app",
  messagingSenderId: "565568523961",
  appId: "1:565568523961:web:3ea96899e218447145d568"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth