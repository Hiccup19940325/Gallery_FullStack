import { Request, Response, NextFunction } from 'express';
import admin from '../firebase'

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authtoken } = req.headers
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(String(authtoken));
        req.body.user = firebaseUser.email;
        next();
    } catch (error) {
        res.status(401).json({
            err: "Invalid or expired token"
        })
    }
}

