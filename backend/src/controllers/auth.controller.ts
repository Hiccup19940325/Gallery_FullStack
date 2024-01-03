import { Response, Request } from "express"
import User from "../models/user"

export const createOrUpdateUser = async (req: Request, res: Response) => {
    const email = req.body.user

    const user = await User.findOneAndUpdate(
        { email },
        { name: email.split("@")[0] },
        { new: true }
    )

    if (user) {
        console.log("User Updated", user)
        res.json(user)
    } else {
        const newUser = await new User({
            email,
            name: email.split("@")[0]
        }).save()

        console.log("User Created", newUser)
        res.json(newUser)
    }
}

export const currentUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            email: req.body.user
        }).exec()
        console.log("current User", user)
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}
