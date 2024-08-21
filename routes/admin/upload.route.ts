import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as uploadController from "../../controllers/admin/upload.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer();

router.post("/", upload.single("file"), uploadCloud.uploadSingle, uploadController.index);

export const uploadRoutes: Router = router;