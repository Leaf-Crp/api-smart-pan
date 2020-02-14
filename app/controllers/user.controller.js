import db from "../../models";


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
}
export default UserController;
