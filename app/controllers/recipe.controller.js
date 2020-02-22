import db from "../../models";
import GlobalConstants from "../constants/global.constants";
import RecipeAssociations from "../constants/recipe.constants";


class RecipeController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let recipes = await db.recipe.findAll(RecipeAssociations.RECIPE_ASSOCIATIONS);
            body = {'recipes': recipes, 'recipe': 'List recipes'};
        } catch (error) {
            status = 500;
            body = {'recipe': error.recipe};
        }
        return response.status(status).json(body);
    }

    static async create(request, response) {
        let status = 200;
        let body = [];
        try {
            let recipeToCreate = {
                label: request.body.label,
                image: request.body.image,
                is_private: request.body.is_private,
                id_recipe_type: request.body.id_recipe_type,
                id_user: request.body.id_user
            };
            let recipe = await db.recipe.create(recipeToCreate);
            body = {'recipeCreated': recipe, 'recipe': 'created'};

        } catch (error) {
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
            let recipe = await db.recipe.findByPk(id,RecipeAssociations.RECIPE_ASSOCIATIONS);
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
            let recipeToUpdate = {};

            if (validation.isSuccessfull()) {
                let recipe = await db.recipe.update(recipeToUpdate,
                    {
                        where: {
                            id: request.params.id
                        }
                    }
                );
                body = {'recipe': recipe, 'message': 'updated_recipe'};
            } else {
                body = {
                    'recipe': GlobalConstants.FAILED_UPDATE,
                    "errors_recipes": validation.getValidationsErrorsRecipes()
                };
            }
        } catch (error) {
            status = 500;
            body = {'recipe': error.recipe};
        }
        return response.status(status).json(body);
    }
}

export default RecipeController;
