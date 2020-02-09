import {Router} from 'express';
import PostController from "../controllers/post.controller";
import db from "../../models";

const router = Router();

router.get('/posts', PostController.list);
router.get('/posts/:id', PostController.details);
router.get('/postcreate', PostController.create);
router.get('/postupdate/:id', PostController.update);
router.get('/delete/:id', PostController.delete);

export default router;

