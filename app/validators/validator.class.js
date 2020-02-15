import db from "../../models";

class Validator{
    constructor(successfull = true, arrayValidationsMessages = []){
        this.successfull = successfull;
        this.arrayValidationsMessages = arrayValidationsMessages;
    }

      isSuccessfull(){
         return this.successfull;
    }

    getValidationsErrorsMessages(){
        return this.arrayValidationsMessages;
    }

    addError(item){
        this.successfull = false;
        this.arrayValidationsMessages.push(item);
    }
}
export default Validator;
