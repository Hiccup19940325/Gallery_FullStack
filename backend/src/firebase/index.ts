import * as admin from "firebase-admin"
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import serviceAccount from "./firebase.json"

const credential = {
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key
}

admin.initializeApp({
    credential: admin.credential.cert(credential)
})

export default admin

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
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);


export const auth = getAuth(app)
