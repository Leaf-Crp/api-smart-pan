import db from "../../models";
import GlobalConstants from "../constants/global.constants";


class StepController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let steps = await db.step.findAll();
            body = {'steps': steps, 'step': 'List steps'};
        } catch (error) {
            status = 500;
            body = {'step': error.step};
        }
        return response.status(status).json(body);
    }

    static async create(request, response) {
        let status = 200;
        let body = [];
        try {
            let stepToCreate = {
                duration: request.body.duration,
                label: request.body.label,
                id_recipe: request.body.id_recipe
            };
            let step = await db.step.create(stepToCreate);
            body = {'stepCreated': step, 'step': 'created'};

        } catch (error) {
            status = 500;
            body = {'step': error.step};
        }
        return response.status(status).json(body);
    }

    static async details(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let step = await db.step.findByPk(id);
            body = {'step': step, 'message': 'Details'};
        } catch (error) {
            status = 500;
            body = {'step': error.step};
        }
        return response.status(status).json(body);
    }


    static async delete(request, response) {
        let status = 200;
        let body = [];
        try {
            await db.step.destroy(
                {
                    where: {
                        id: request.params.id
                    }
                }
            );
            body = {'step': 'step_deleted'};
        } catch (error) {
            status = 500;
            body = {'step': error.step};
        }
        return response.status(status).json(body);
    }


    static async update(request, response) {
        let status = 200;
        let body = [];
        try {


            let stepToUpdate = {
                email: request.body.email,
                password: requets.body.password
            };

            let validation = await StepValidator.validateStepCreation(stepToUpdate, false);
            if (validation.isSuccessfull()) {
                let step = await db.step.update(stepToUpdate,
                    {
                        where: {
                            id: request.params.id
                        }
                    }
                );
                body = {'step': step, 'message': 'updated_step'};
            } else {
                body = {
                    'step': GlobalConstants.FAILED_UPDATE,
                    "errors_steps": validation.getValidationsErrorsSteps()
                };
            }
        } catch (error) {
            status = 500;
            body = {'step': error.step};
        }
        return response.status(status).json(body);
    }
}

export default StepController;
