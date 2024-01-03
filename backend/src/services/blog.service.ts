import Blog from "../models/Blog";
import { IAlbum } from "../common/types";

export async function createAlbum(album: IAlbum, page: number, limit: number) {
    try {
        await new Blog(album).save();

        const blogs = await Blog.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ updatedAt: -1 })
            .exec()

        return blogs
    } catch (error) {
        return null
    }
}

export async function readAlbum(page: number, limit: number) {
    try {
        const blogs = await Blog.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ updatedAt: -1 })
            .exec()

        return blogs
    } catch (error) {
        return null
    }
}

export async function updateAlbum(flag: string, id: string, album: IAlbum) {
    try {
        let updated;
        if (flag == 'true') {
            updated = await Blog.findOneAndUpdate(
                { _id: id },
                { name: album.name },
                { new: true }
            ).exec()
        } else {
            updated = await Blog.findOneAndUpdate(
                { _id: id },
                album,
                { new: true }
            ).exec()
        }

        return updated
    } catch (error) {
        return null
    }
}

export async function removeAlbum(id: string) {
    try {
        const deleted = await Blog.findByIdAndDelete(id).exec()

        return deleted
    } catch (error) {
        return null
    }
}