module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const User = sequelize.define('user', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            is_connected_pan: DataTypes.BOOLEAN,
            alarm_ended_recipe: DataTypes.STRING,
            alarm_ended_step: DataTypes.STRING
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
    User.associate = (models) => {
        User.hasMany(models.recipe, {foreignKey: 'id_user' });
        User.belongsToMany(models.recipe, {
            through: 'user_cooked_recipe',
            as: 'historics',
            foreignKey: 'id_user'
        });
    };

    return User;
};