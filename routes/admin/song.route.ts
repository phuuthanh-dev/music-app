import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as songController from "../../controllers/admin/song.controller";

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer();

router.get("/", songController.index);

router.get("/create", songController.create);

router.post("/create", upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
    uploadCloud.uploadFields, songController.createPost);

router.get("/edit/:songId", songController.edit);

router.patch("/edit/:songId", upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
    uploadCloud.uploadFields, songController.editPatch);

export const songRoutes: Router = router;