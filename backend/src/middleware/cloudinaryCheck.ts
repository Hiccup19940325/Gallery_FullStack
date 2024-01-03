// import cloudinary from 'cloudinary'
import { v2 as cloudinary } from "cloudinary"
import { Response, Request, NextFunction } from "express"
import Blog from "../models/Blog"

export const upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })

        if (req.params._flag == "true") next()
        else {
            console.log("upload check")
            const result = await cloudinary.uploader.upload(req.body.image, {
                public_id: `${Date.now()}`,
                resource_type: "auto"
            })
            req.body.image = {
                public_id: result.public_id,
                url: result.secure_url
            }
            next()
        }
    } catch (error) {
        console.log((error as Error).message)
        res.status(400).json({
            error: (error as Error).message
        })
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        if (req.params._flag == "true") next()
        else {
            console.log("remove check")

            const data = await Blog.findById(req.params._id)
            const image_id = data?.image?.public_id

            if (image_id)
                await cloudinary.uploader.destroy(image_id, (err: unknown) => {
                    if (err) return res.json({ success: false, err })
                    next()
                })
            else res.status(400).json("Invalid image")
        }
    } catch (error) {
        console.log((error as Error).message)
        res.status(400).json({
            error: (error as Error).message
        })
    }
}
