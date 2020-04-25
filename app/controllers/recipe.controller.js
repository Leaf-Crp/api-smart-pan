import db from "../../models";
import GlobalConstants from "../constants/global.constants";
import RecipeAssociations from "../constants/recipe.constants";
const multer = require('multer');
const upload = multer({dest:'public/uploads/recipes'}).single("recipe_image");


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
    /*    let fileName = "";
          await upload(request,response, (err)=>{
              let fileName = (request.file.destination + '/'+ request.file.filename);
              console.log(fileName);
          });*/

               let recipe = await db.recipe.create(recipeToCreate);
               request.body.steps.map(async step => {
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

               body = {'recipeCreated': 12, 'recipe': 'created'};
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