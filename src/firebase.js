import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyDn-9DgePcJdAku1cBMh2r_ohsKBwytzm8",
    authDomain: "kyvor-c239a.firebaseapp.com",
    projectId: "kyvor-c239a",
    storageBucket: "kyvor-c239a.appspot.com",
    messagingSenderId: "677145141039",
    appId: "1:677145141039:web:35b47234f7953847808bda"
  };
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)





