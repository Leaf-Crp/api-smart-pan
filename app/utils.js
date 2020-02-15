var bcrypt = require('bcrypt');

class Utils {
    static async hashPassword(plainPassword) {
        const salt = bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(plainPassword, salt);
        console.log(hashedPassword);
        return hashedPassword;
    }
}

export default Utils;
