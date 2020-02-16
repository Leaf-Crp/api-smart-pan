import db from "../../models";
import Utils from "../utils";
import GlobalConstants from "../constants/global.constants";


class INgredientController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let ingredients = await db.ingredient.findAll();
            body = {'ingredients': ingredients, 'ingredient': 'List ingredients'};
        } catch (error) {
            status = 500;
            body = {'ingredient': error.ingredient};
        }
        return response.status(status).json(body);
    }
}

export default INgredientController;
