import { object, string } from "yup"

export const authSchema = object({
    body: object({
        user: string().email("Must be a valid email.").max(128).required("Email is required.")
    })
})
