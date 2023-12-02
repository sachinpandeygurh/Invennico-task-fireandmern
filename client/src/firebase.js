import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpWRssEdPhYJX_NX-3YOTL9-egnIviS-8",
  authDomain: "ass-otp.firebaseapp.com",
  projectId: "ass-otp",
  storageBucket: "ass-otp.appspot.com",
  messagingSenderId: "387708691196",
  appId: "1:387708691196:web:c2b9955d9522a329786d79",
  measurementId: "G-W04B3XKW19"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
