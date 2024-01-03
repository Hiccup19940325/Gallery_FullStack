import { object, string } from "yup"

export const blogSchema = object({
    body: object({
        user: string().email("Must be a valid email.").max(128).required("Email is required."),
        name: string().required("name is required."),
        image: string().required("name is required."),
        owner: string().email("Must be a valid email.").max(128).required("Email is required.")
    })
})
