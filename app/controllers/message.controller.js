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

    static async create(request, response) {
        let status = 200;
        let body = [];
        try {
            let messageToCreate = {
                content: request.body.content,
                id_topic: request.body.id_topic
            };
            let message = await db.message.create(messageToCreate);
            body = {'messageCreated': message, 'message': 'created'};

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
            let topicToUpdate = {
                email: request.body.email,
                password: hashedPassword
            };
            let topic = await db.topic.update(topicToUpdate,
                {
                    where: {
                        id: request.params.id
                    }
                }
            );
            body = {'topic': topic, 'message': 'updated_topic'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }

        return response.status(status).json(body);
    }
}

export default MessageController;
