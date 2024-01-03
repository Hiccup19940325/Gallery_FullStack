import Blog from "../models/Blog"
import { Response, Request } from "express"

export const create = async (req: Request, res: Response) => {
    try {
        await new Blog(req.body).save()

        const page = Number(req.params.page)
        const limit = Number(req.params.limit)

        const blogs = await Blog.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ updatedAt: -1 })
            .exec()
        res.json(blogs)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: (error as Error).message
        })
    }
}

export const read = async (req: Request, res: Response) => {
    try {
        const page = Number(req.params.page)
        const limit = Number(req.params.limit)
        console.log(page, limit)

        const blogs = await Blog.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ updatedAt: -1 })
            .exec()
        res.json(blogs)
    } catch (error) {
        console.error(error)
        res.status(400).send("fetch One item from Product failed..")
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        let updated
        if (req.params._flag == "true") {
            updated = await Blog.findOneAndUpdate(
                { _id: req.params._id },
                { name: req.body.name },
                { new: true }
            ).exec()
        } else {
            console.log("run data change")
            updated = await Blog.findOneAndUpdate({ _id: req.params._id }, req.body, {
                new: true
            }).exec()
        }
        res.json(updated)
    } catch (err) {
        console.log("PRODUCT UPDATE ERROR ----> ", err)
        res.status(400).json({
            err: (err as Error).message
        })
    }
}

export const removeData = async (req: Request, res: Response) => {
    try {
        const deleted = await Blog.findByIdAndDelete(req.params._id).exec()
        res.json(deleted)
    } catch (error) {
        res.status(400).json("delete One in Blog is failed ..")
    }
}
