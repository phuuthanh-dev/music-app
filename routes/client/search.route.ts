import { Router } from "express";
const router: Router = Router();

import * as searchController from "../../controllers/client/search.controller";

router.get("/:type", searchController.result);

export const searchRoutes: Router = router;