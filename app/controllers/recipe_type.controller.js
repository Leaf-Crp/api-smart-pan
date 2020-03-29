import db from "../../models";

class RecipeTypeController {
    /**
     * liste des types de recettes
     * @param request
     * @param response
     * @returns {Promise<Json|any>}
     */
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let recipe_types = await db.recipe_type.findAll();
            body = {'recipe_types': recipe_types, 'recipe_type': 'List recipe_type'};
        } catch (error) {
            status = 500;
            body = {'recipe_type': error.recipe_type};
        }
        return response.status(status).json(body);
    }
}


export default RecipeTypeController;
