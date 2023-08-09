import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjBjQSUplUd-HWakYSqW8wPAXnvTYYaS0",
  authDomain: "mern-ecommerce-clone.firebaseapp.com",
  projectId: "mern-ecommerce-clone",
  storageBucket: "mern-ecommerce-clone.appspot.com",
  messagingSenderId: "222644639529",
  appId: "1:222644639529:web:b561318a0c34ceea280938",
  measurementId: "G-B8TJ14E86V",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app);
