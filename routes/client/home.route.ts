import { Router } from "express";
const router: Router = Router();

import * as homeController from "../../controllers/client/home.controller";

router.get("/", homeController.index);

export const homeRoutes: Router = router;