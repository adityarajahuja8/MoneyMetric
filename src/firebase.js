import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAlWJkAIUuqQtF7R6KRkrJHI6UqwRYedlY",
    authDomain: "fintech-dashboard-9aabc.firebaseapp.com",
    databaseURL: "https://fintech-dashboard-9aabc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fintech-dashboard-9aabc",
    storageBucket: "fintech-dashboard-9aabc.firebasestorage.app",
    messagingSenderId: "769766006935",
    appId: "1:769766006935:web:692b2e1eb69290c0a849d2",
    measurementId: "G-7PDLGFYL68"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
