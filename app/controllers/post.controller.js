import db from "../../models";

class PostController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let posts = await db.post.findAll({
                include: [{
                    model: db.author
                }]
            });
            body = {'account_actions': posts, 'message': 'List account_actions'};
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
            let post = await db.post.findByPk(id, {
                include: [{
                    model: db.author
                }]
            });
            body = {'account_action': post, 'message': 'Details'};
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
            let post = await db.post.create(
                {
                    title: "hello",
                    content: "hellow rodl"
                }
            );
            body = {'account_action': post, 'message': 'created'};
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
            let post = await db.post.update(
                {
                    title: "hello updated",
                    content: "hellow rodl updated"
                },
                {
                    where: {
                        id: request.params.id
                    }
                }
            );
            body = {'account_action': post, 'message': 'created'};
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
            let post = await db.post.destroy(
                {
                    where: {
                        id: request.params.id
                    }
                }
            );
            body = {'account_action': post, 'message': 'created'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }
}


export default PostController;
