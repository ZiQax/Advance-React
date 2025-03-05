import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAamkZFhJmeWAxax07VTQduTcgUZECMXrY",
  authDomain: "ziqaweb.firebaseapp.com",
  projectId: "ziqaweb",
  storageBucket: "ziqaweb.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, signOut };
