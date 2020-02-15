import db from "../../models";
import Utils from "../utils";
import GlobalConstants from "../constants/global.constants";


class MessageController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let messages = await db.message.findAll();
            body = {'messages': messages, 'message': 'List messages'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    static async detailsTopic(request, response) {
        let status = 200;
        let body = {};
        try {
            let messages = await db.message.findAll();
            body = {'messages': messages, 'message': 'List messages'};
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
                let topic = await db.topic.findOne({where: {email: request.body.email}});
                let matchPassword = (await bcrypt.compare(request.body.password, topic.password));
                if (matchPassword) {
                    body = {'topic': topic, 'message': MessageConstants.LOGIN_SUCCESSFULL};
                }
            } catch (error) {
                body = {'message': MessageConstants.FAILED_CONNECTION};
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
            let topicToCreate = {
                email: request.body.email,
                password: hashedPassword
            };
            let validation = await MessageValidator.validateMessageCreation(topicToCreate, true);
            if (validation.isSuccessfull()) {
                let topic = await db.topic.create(topicToCreate);
                body = {'topic': topic, 'message': 'created'};
            } else {
                body = {
                    'topic': GlobalConstants.FAILED_CREATION,
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
            let topic = await db.topic.findByPk(id);
            body = {'topic': topic, 'message': 'Details'};
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
            await db.topic.destroy(
                {
                    where: {
                        id: request.params.id
                    }
                }
            );
            body = {'message': 'topic_deleted'};
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

            let topicToUpdate = {
                email: request.body.email,
                password: hashedPassword
            };

            let validation = await MessageValidator.validateMessageCreation(topicToUpdate, false);
            if (validation.isSuccessfull()) {
                let topic = await db.topic.update(topicToUpdate,
                    {
                        where: {
                            id: request.params.id
                        }
                    }
                );
                body = {'topic': topic, 'message': 'updated_topic'};
            } else {
                body = {
                    'topic': GlobalConstants.FAILED_UPDATE,
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

export default MessageController;
