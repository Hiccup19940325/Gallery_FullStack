import * as admin from "firebase-admin"
// import { IServiceAccount } from '../common/types';
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
