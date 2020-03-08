import db from "../../models";
import GlobalConstants from "../constants/global.constants";
import UserConstants from "../constants/user.constants";


class HistoricController {
    /**
     * Sauvegarde l'historique d'une recette en cours si déjà existante on update
     * @param request
     * @param response
     * @returns {Promise<*|Json>}
     */
    static async makeHistoric(request, response) {
        let status = 200;
        let body = [];
        try {
            let historic = {
                id_user: request.body.user,
                id_recipe: request.body.recipe,
                id_step: request.body.step,
                date: request.body.date
            };
            let alreadyExistHistoric = await db.user_cooked_recipe.count({
                where: {
                    id_user: historic.id_user,
                    id_recipe: historic.id_recipe
                }
            });
            let user_cooked_recipe, message;
            if (!alreadyExistHistoric) {
                user_cooked_recipe = await db.user_cooked_recipe.create(historic);
                message = "Nouvel historique crée";
            } else {
                user_cooked_recipe = await db.user_cooked_recipe.update(historic,
                    {
                        where: {
                            id_user: historic.id_user,
                            id_recipe: historic.id_recipe
                        }
                    }
                );
                message = "Ancien historique mis à jour";
            }
            body = {'historic': user_cooked_recipe, 'message': message};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     * Abandonne la recette en cours de préparation
     * @param request
     * @param response
     * @returns {Promise<*|Json>}
     */
    static async delete(request, response) {
        let status = 200;
        let body = [];
        try {
            console.log(123);
            await db.user_cooked_recipe.destroy(
                {
                    where: {
                        id_user: request.params.iduser,
                        id_recipe: request.params.idrecipe
                    }
                }
            );
            body = {'message': 'historic deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }
}

export default HistoricController;