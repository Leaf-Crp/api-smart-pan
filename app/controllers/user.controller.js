import db from "../../models";
import UserValidator from "../validators/user.validator";
import Utils from "../utils";
import GlobalConstants from "../constants/global.constants";
import UserConstants from "../constants/user.constants";
import RecipeAssociations from "../constants/recipe.constants";
import {where} from "sequelize";

var bcrypt = require('bcrypt');

class UserController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let users = await db.user.findAll();
            body = {'users': users, 'message': 'List users'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     *Vérifie si l'utilisateur existe et que le password match
     * @param request
     * @param response
     * @returns {Promise<*|Json>}
     */
    static async checkLogin(request, response) {
        let status = 200;
        let body = [];
        try {
            try {
                let user = await db.user.findOne({where: {email: request.body.email}});
                let matchPassword = (await bcrypt.compare(request.body.password, user.password));
                if (matchPassword) {
                    body = {'user': user, 'message': UserConstants.LOGIN_SUCCESSFULL};
                }
            } catch (error) {
                body = {'message': UserConstants.FAILED_CONNECTION};
            }

        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    static async create(request, response) {
        let status = 200;
        let body = [];
        try {
            //Crypte le mdp avec bcrypt
            const salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(request.body.password, salt);
            let userToCreate = {
                email: request.body.email,
                password: hashedPassword,
                lastname: request.body.lastname,
                firstname: request.body.firstname,
                is_connected_pan: request.body.is_connected_pan,
                alarm_ended_recipe: "",
                alarm_ended_step: ""
            };
            let validation = await UserValidator.validateUserCreation(userToCreate, true);
            if (validation.isSuccessfull()) {
                let user = await db.user.create(userToCreate);
                body = {'user': user, 'message': 'created'};
            } else {
                body = {
                    'user': GlobalConstants.FAILED_CREATION,
                    "errors_messages": validation.getValidationsErrorsMessages()
                };
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    static async details(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let user = await db.user.findOne( {
                where: {
                    email: request.params.email.trim()
                }
            }, {
                include: [{
                    association: 'historics',
                    attributes: {exclude: ['id_recipe_type', 'id_user']}
                }],
            });
            body = {'user': user, 'message': 'Details'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }


    static async delete(request, response) {
        let status = 200;
        let body = [];
        try {
            await db.user.destroy(
                {
                    where: {
                        id: request.params.id
                    }
                }
            );
            body = {'message': 'user_deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }


    static async update(request, response) {
        let status = 200;
        let body = [];
        try {
            const salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(request.body.password, salt);

            let userToUpdate = {
                email: request.body.email,
                password: hashedPassword,
                lastname: request.body.lastname,
                firstname: request.body.firstname,
                is_connected_pan: request.body.is_connected_pan,
                alarm_ended_recipe: request.body.alarm_ended_recipe,
                alarm_ended_step: request.body.alarm_ended_step
            };

             request.files['alarm_ended_recipe'] && (userToUpdate.alarm_ended_recipe = RecipeAssociations.RECIPE_IMAGE_PATH + request.files['alarm_ended_recipe'][0].filename);
             request.files['alarm_ended_step'] && (userToUpdate.alarm_ended_step = RecipeAssociations.RECIPE_IMAGE_PATH + request.files['alarm_ended_step'][0].filename);

            let validation = await UserValidator.validateUserCreation(userToUpdate, false);
            if (validation.isSuccessfull()) {
                let user = await db.user.update(userToUpdate,
                    {
                        where: {
                            id: request.params.id
                        }
                    }
                );
                body = {'user': user, 'message': 'updated_user'};
            } else {
                body = {
                    'user': GlobalConstants.FAILED_UPDATE,
                    "errors_messages": validation.getValidationsErrorsMessages()
                };
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }
}

export default UserController;
