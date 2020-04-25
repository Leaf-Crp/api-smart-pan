import {Router} from 'express';
import PostController from "../controllers/post.controller";
import db from "../../models";
import UserController from "../controllers/user.controller";
import TopicController from "../controllers/topic.controller";
import MessageController from "../controllers/message.controller";
import IngredientController from "../controllers/ingredient.controller";
import StepController from "../controllers/step.controller";
import RecipeController from "../controllers/recipe.controller";
import PrerequisiteTypeController from "../controllers/prerequisite_type.controller";
import HistoricController from "../controllers/user_cooked_recipe";
import PrerequisiteTypeStepController from "../controllers/prerequisite_type_step.controller";
import RecipeTypeController from "../controllers/recipe_type.controller";

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

router.post('/historic', HistoricController.makeHistoric);
router.delete('/historic/:iduser/:idrecipe', HistoricController.delete);

router.get('/topics', TopicController.list);
router.get('/topics/:id', TopicController.details);
router.post('/topics', TopicController.create);

router.get('/messages', MessageController.list);
router.post('/messages', MessageController.create);

router.get('/ingredients', IngredientController.list);
router.post('/ingredients', IngredientController.create);

//revoir la liaison many to many pas OK
router.get('/steps', StepController.list);
router.post('/steps', StepController.create);
router.get('/steps/:id', StepController.details);

router.get('/recipes', RecipeController.list);
router.post('/recipes', RecipeController.create);
router.get('/recipes/:id', RecipeController.details);
router.delete('/recipes/:id', RecipeController.delete);

router.get('/recipe_types', RecipeTypeController.list);

router.get('/prerequisite_types', PrerequisiteTypeController.list);

router.post('/check_step/:id', PrerequisiteTypeStepController.shouldStepStart);


export default router;
