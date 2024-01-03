import { Router } from "express"
import { createOrUpdateUser, currentUser } from "../controllers/auth.controller"
import { authCheck } from "../middleware/authCheck"
import { upload, remove } from "../middleware/cloudinaryCheck"
import { create, read, update, removeData } from "../controllers/blog.controller"
import validate from "../middleware/validateRequest"
import { authSchema } from "../schema/auth.schema"
import { blogSchema } from "../schema/blog.schema"

const router = Router()

router.post("/api/create-or-update-user", authCheck, validate(authSchema), createOrUpdateUser)
router.post("/api/current-user", authCheck, validate(authSchema), currentUser)

router.post("/api/create-blog/:page/:limit", authCheck, validate(blogSchema), upload, create)
router.get("/api/blogs/:page/:limit", read)
router.put("/api/blog/:_id/:_flag", authCheck, validate(blogSchema), remove, upload, update)
router.post("/api/blog/:_id", authCheck, remove, removeData)

export default router
