import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIfy8Jhg7v3CJEqmP3yd7a6jzEvhaxpx8",
  authDomain: "pos-inventory-df2ac.firebaseapp.com",
  projectId: "pos-inventory-df2ac",
  storageBucket: "pos-inventory-df2ac.appspot.com",
  messagingSenderId: "286247496203",
  appId: "1:286247496203:web:b8a6f16fa349bb1ee2f50e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };