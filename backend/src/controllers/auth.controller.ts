import { Response, Request } from "express"
import { createOrUpdateHandler, currentUserHandler } from "../services/auth.service"

export const createOrUpdateUser = async (req: Request, res: Response) => {
    const email = req.body.user

    const result = await createOrUpdateHandler(email);

    if (!result) {
        return res.status(500).json({ message: `Auth failed with email : ${email}` })
    }

    return res.status(200).json(result);
}

export const currentUser = async (req: Request, res: Response) => {
    const email = req.body.user;

    const result = await currentUserHandler(email);

    if (!result) {
        return res.status(500).json({ message: `Authorization is failed` })
    }

    return res.status(200).json(result);
}
