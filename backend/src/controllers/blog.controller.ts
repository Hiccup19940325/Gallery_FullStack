import { Response, Request } from "express"
import { createAlbum, readAlbum, updateAlbum, removeAlbum } from "../services/blog.service"

export const create = async (req: Request, res: Response) => {
    const page = Number(req.params.page)
    const limit = Number(req.params.limit)

    const result = await createAlbum(req.body, page, limit);

    if (!result) {
        return res.status(500).json({ message: `Creation failed ` })
    }

    return res.status(200).json(result)
}

export const read = async (req: Request, res: Response) => {
    const page = Number(req.params.page)
    const limit = Number(req.params.limit)

    const result = await readAlbum(page, limit);

    if (!result) {
        return res.status(500).json({ message: `reading is failed ` })
    }

    return res.status(200).json(result)

}

export const update = async (req: Request, res: Response) => {
    const flag = req.params._flag;
    const id = req.params._id;

    const result = await updateAlbum(flag, id, req.body);

    if (!result) {
        return res.status(500).json({ message: `upgrading is failed` })
    }

    return res.status(200).json(result)

}

export const removeData = async (req: Request, res: Response) => {
    const result = await removeAlbum(req.params._id);

    if (!result) {
        return res.status(500).json({ message: `deleting is failed` })
    }

    return res.status(200).json(result)

}
