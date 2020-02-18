import db from "../../models";

class IngredientController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let ingredients = await db.ingredient.findAll({
                include: { association: 'steps'}
            });
            body = {'ingredients': ingredients, 'ingredient': 'List ingredients'};
        } catch (error) {
            status = 500;
            body = {'ingredient': error.ingredient};
        }
        return response.status(status).json(body);
    }
    static async create(request, response) {
        let status = 200;
        let body = [];
        try {
            let step = await db.step.create(request.body);
            body = {'stepCreated': step, 'step': 'created'};

        } catch (error) {
            status = 500;
            body = {'step': error.step};
        }
        return response.status(status).json(body);
    }
}

export default IngredientController;
