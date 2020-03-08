import db from "../../models";
import Utils from "../utils";
import GlobalConstants from "../constants/global.constants";


class TopicController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let topics = await db.topic.findAll({
                include: [{
                    model: db.message,
                    required: true
                }, {
                    model: db.user,
                    required: true
                }]
            });
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
            let topicToCreate = {
                title: request.body.title,
                content: request.body.content,
                id_user: request.body.id_user
            };
            let topic = await db.topic.create(topicToCreate);
            body = {'topic': topic, 'message': 'created'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     * Le topic et ses messages
     * @param request
     * @param response
     * @returns {Promise<*|Json>}
     */
    static async details(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let topic = await db.topic.findByPk(id, {
                include: [{
                    model: db.message,
                    required: true
                }, {
                    model: db.user,
                    required: true
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

export default TopicController;
