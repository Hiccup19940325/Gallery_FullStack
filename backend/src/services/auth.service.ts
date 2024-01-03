import User from "../models/user";

export async function createOrUpdateHandler(email: string) {
    try {
        const user = await User.findOneAndUpdate(
            { email },
            { name: email.split("@")[0] },
            { new: true }
        )
        if (user) {
            return user
        } else {
            const newUser = await new User({
                email,
                name: email.split("@")[0]
            }).save()

            console.log("User Created", newUser)
            return newUser
        }
    } catch (error) {
        return null
    }
}

export async function currentUserHandler(email: string) {
    try {
        const user = await User.findOne({
            email: email
        }).exec()
        return user;
    } catch (error) {
        return null
    }
}