import { Router } from "express";
const router: Router = Router();

import * as songController from '../../controllers/client/song.controller';

router.get("/favorite", songController.favorite);

router.get('/:slugTopic', songController.list);

router.get('/detail/:slugSong', songController.detail);

router.patch("/like/:status/:songId", songController.like);

router.patch("/favorite/:status/:songId", songController.favoritePatch);

router.patch("/listen/:songId", songController.listenPatch);

export const songRoutes: Router = router;