import {Router} from 'express';
import PostController from "../controllers/post.controller";
import db from "../../models";
import UserController from "../controllers/user.controller";
import TopicController from "../controllers/topic.controller";
import MessageController from "../controllers/message.controller";

const router = Router();

router.get('/posts', PostController.list);
router.get('/posts/:id', PostController.details);
router.get('/postcreate', PostController.create);
router.get('/postupdate/:id', PostController.update);
router.get('/delete/:id', PostController.delete);

router.get('/users', UserController.list);
router.post('/users', UserController.create);
router.post('/check_login', UserController.checkLogin);
router.delete('/users/:id', UserController.delete);
router.put('/users/:id', UserController.update);
router.get('/users/:id', UserController.details);

router.get('/topics', TopicController.list);
router.get('/topics/:id', TopicController.details);

router.get('/messages', MessageController.list);

export default router;

