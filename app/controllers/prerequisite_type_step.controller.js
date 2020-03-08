import db from "../../models";
import UserValidator from "../validators/user.validator";
import PrerequisiteTypeStepValidator from "../validators/prerequisite_type_step.validator";
import GlobalConstants from "../constants/global.constants";
import PrerequisiteTypeConstantsConstants from "../constants/prerequisite_type.constants";

class PrerequisiteTypeStepController {

    /**
     * Fonction vérifiant que la poêle a rempli les conditions pour démarrer
     * @param request
     * @param response
     * @returns {Promise<*|Json>}
     */
    static async shouldStepStart(request, response) {
        let status = 200;
        let body = {};
        try {
            //objet contenant les infos de la poele
            let informationPanToCheck = {
                temperature: request.body.temperature
            };
            //on vérifie que chaque prérequis de cette étape est validé
            let validation = await PrerequisiteTypeStepValidator.authorizeStepToStart(informationPanToCheck, request.params.id);
            console.log(validation);
            if (validation.isSuccessfull()) {
                //si oui on renvoie l'autorisation de réaliser cette étape
                body = {'authorizeStepToStart': true};
            } else {
                body = {
                    'user': PrerequisiteTypeConstantsConstants.CANT_START_STEP,
                    "errors_messages": validation.getValidationsErrorsMessages()
                };
            }
        } catch (error) {
            status = 500;
            body = {'prerequisite_type': error.prerequisite_type};
        }
        return response.status(status).json(body);
    }
}


export default PrerequisiteTypeStepController;
