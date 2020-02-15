import db from "../../models";
import Utils from "../utils";
import GlobalConstants from "../constants/global.constants";


class TopicController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let topics = await db.topic.findAll();
            body = {'topics': topics, 'message': 'List topics'};
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
            let validation = await TopicValidator.validateTopicCreation(topicToCreate, true);
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
            let topic = await db.topic.findByPk(id, {
                include: [{
                    model: db.message
                }]
            });
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

            let validation = await TopicValidator.validateTopicCreation(topicToUpdate, false);
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

export default TopicController;
