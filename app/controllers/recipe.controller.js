import db from "../../models";
import GlobalConstants from "../constants/global.constants";
import RecipeAssociations from "../constants/recipe.constants";

const multer = require('multer');
const upload = multer({dest: 'public/uploads/recipes'}).single("file");
const fs = require('fs');



class RecipeController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let recipes = await db.recipe.findAll(RecipeAssociations.RECIPE_ASSOCIATIONS);
            //on accède aux propriétés mtm directement dans l'objet
            recipes.map(r => {
                r.steps.map(s => {
                    s.ingredients.map(i => {
                        i.setDataValue('quantity', i.step_ingredient.quantity);
                    });
                    s.prerequisite_type.map(p => {
                        p.setDataValue('detail', p.prerequisite_type_step.detail);
                    })
                })
            });
            body = recipes;
        } catch (error) {
            status = 500;
            body = {'recipe': error.recipe};
        }
        return response.status(status).json(body);
    }

    //à refactoriser ...
    static async own_recipes(request, response) {
        let status = 200;
        let body = {};
        try {
            let recipes = await db.recipe.findAll(RecipeAssociations.OWN_RECIPE_ASSOCIATIONS);
            //on accède aux propriétés mtm directement dans l'objet
            recipes.map(r => {
                r.steps.map(s => {
                    s.ingredients.map(i => {
                        i.setDataValue('quantity', i.step_ingredient.quantity);
                    });
                    s.prerequisite_type.map(p => {
                        p.setDataValue('detail', p.prerequisite_type_step.detail);
                    })
                })
            });
            body = {'recipes': recipes, 'message': 'list of own recipes'};
        } catch (error) {
            status = 500;
            body = {'recipe': error.recipe};
        }
        return response.status(status).json(body);
    }

    static async create(request, response) {
        let jsonRecipe = (JSON.parse(request.body.recipe));
        let status = 200;
        let body = [];
        try {
            let recipeToCreate = {
                label: jsonRecipe.label,
                image: '',
                is_private: jsonRecipe.is_private,
                id_recipe_type: jsonRecipe.id_recipe_type,
                id_user: jsonRecipe.id_user
            };
            request.file && (recipeToCreate.image = RecipeAssociations.RECIPE_IMAGE_PATH + request.file.filename);

            let recipe = await db.recipe.create(recipeToCreate);
            jsonRecipe.steps.map(async step => {
                step.id_recipe = recipe.id;
                let stepCreated = await db.step.create(step);
                step.ingredients.map(async ingredient => {
                    let step_ingredient = {
                        id_step: stepCreated.id,
                        id_ingredient: ingredient.id,
                        quantity: ingredient.quantity
                    };
                    await db.step_ingredient.create(step_ingredient);
                });
                step.prerequisiteTypes.map(async prerequisite => {
                    let prerequisite_type_step = {
                        id_step: stepCreated.id,
                        id_prerequisite_type: prerequisite.id,
                        detail: prerequisite.detail
                    };
                    await db.prerequisite_type_step.create(prerequisite_type_step);
                })
            });
            body = {'recipeCreated': recipe, 'recipe': 'created'};
        } catch (error) {
            console.log(error);
            status = 500;
            body = {'recipe': error.recipe};
        }
        return response.status(status).json(body);
    }

    static async details(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let recipe = await db.recipe.findByPk(id, RecipeAssociations.RECIPE_ASSOCIATIONS);
            body = {'recipe': recipe, 'message': 'Details'};
        } catch (error) {
            status = 500;
            body = {'recipe': error.recipe};
        }
        return response.status(status).json(body);
    }


    static async delete(request, response) {
        let status = 200;
        let body = [];
        try {
            await db.recipe.destroy(
                {
                    where: {
                        id: request.params.id
                    }
                }
            );
            body = {'recipe': 'recipe_deleted'};
        } catch (error) {
            status = 500;
            body = {'recipe': error.recipe};
        }
        return response.status(status).json(body);
    }


    static async update(request, response) {
        let status = 200;
        let body = [];
        try {
            let recipe = await db.recipe.update(request.body,
                {
                    where: {
                        id: request.params.id
                    }
                }
            );
            body = {'recipe': recipe, 'message': 'updated_recipe'};
        } catch (error) {
            status = 500;
            body = {'recipe': error.recipe};
        }
        return response.status(status).json(body);
    }
}

export default RecipeController;
