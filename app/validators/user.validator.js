import db from "../../models";
import Validator from "./validator.class";
import UserConstants from "../constants/user.constants";

class UserValidator {

    /**
     *Valide ou non la création d'un utilisateur
     * @param user
     * @returns {Promise<boolean>}
     */
    static async validateUserCreation(user, isCreation = false) {
        let validation = new Validator();
        if (isCreation) {
            let alreadyExistUser = await db.user.findOne({where: {email: user.email}});
            //mail déjà utilisé
            if (alreadyExistUser !== null) {
                validation.addError(UserConstants.ALREADY_EXIST)
            }
        }

        if (user.lastname === null || user.lastname === "") {
            validation.addError(UserConstants.EMPTY_LASTNAME)
        }
        if (user.firstname === null || user.firstname === "") {
            validation.addError(UserConstants.EMPTY_FIRSTNAME)
        }
        if (user.password === null || user.password === "") {
            validation.addError(UserConstants.EMPTY_PASSWORD)
        }
        if (user.password.length < 8) {
            validation.addError(UserConstants.INVALID_PASSWORD)
        }
        return validation;
    }
}

export default UserValidator;
