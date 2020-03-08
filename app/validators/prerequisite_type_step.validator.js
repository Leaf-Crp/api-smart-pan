import db from "../../models";
import Validator from "./validator.class";
import PrerequisiteTypeConstantsConstants from "../constants/prerequisite_type.constants";

class PrerequisiteTypeStepValidator {

    /**
     *Autorise ou non une étape à démarrer, si non retourne les erreurs empechant le debut d'étape
     * @param panInfos
     * @returns {Promise<boolean>}
     */
    static async authorizeStepToStart(panInfos, idStep) {
        let validation = new Validator();

        //recupération des prerequis de cette étape
        let prerequisite_type = await db.prerequisite_type_step.findAll({
            where: {
                id_step: idStep
            },
            include: [{
                model: db.prerequisite_type,
                required: true
            }]
        });
        prerequisite_type.map(prerequisite => {
            if (prerequisite.prerequisite_type.code === PrerequisiteTypeConstantsConstants.MIN_TEMPERATURE) {
                if (parseFloat(prerequisite.detail) > parseFloat(panInfos.temperature)) {
                    validation.addError(PrerequisiteTypeConstantsConstants.MIN_TEMPERATURE_ERROR);
                    console.log("Jeannnenennenenenenene");
                }
            }
        });
        return validation;
    }
}

export default PrerequisiteTypeStepValidator;
