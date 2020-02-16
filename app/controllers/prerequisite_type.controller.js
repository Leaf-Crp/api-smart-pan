import db from "../../models";

class PrerequisiteTypeController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let prerequisite_type = await db.prerequisite_type.findAll();
            body = {'prerequisite_types': prerequisite_type, 'prerequisite_type': 'List prerequisite_types'};
        } catch (error) {
            status = 500;
            body = {'prerequisite_type': error.prerequisite_type};
        }
        return response.status(status).json(body);
    }

}


export default PrerequisiteTypeController;
