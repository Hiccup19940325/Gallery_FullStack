import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, User, GoogleAuthProvider } from "firebase/auth";
// import dotenv from 'dotenv'

// dotenv.config();

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGE_SENDER,
//     appId: process.env.APP_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyBFw-BGXe-yUwGogDoRhPLDjejVGO-74zQ",
    authDomain: "albumsite-23a52.firebaseapp.com",
    projectId: "albumsite-23a52",
    storageBucket: "albumsite-23a52.appspot.com",
    messagingSenderId: "336527852407",
    appId: "1:336527852407:web:17ec188dfa94d0137cd772",
    measurementId: "G-0H8QNVPKPV"
};
// Initialize Firebase
console.log(getApps().length)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

console.log(app, "+++++++++++++++++++++++")

export const auth = getAuth(app)

export const googleAuthProvider = new GoogleAuthProvider();