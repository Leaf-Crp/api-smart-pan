module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const Message = sequelize.define('message', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            content: DataTypes.TEXT
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );

    Message.associate = (models) => {
        Message.belongsTo(models.user, {foreignKey: 'id_user'});
        Message.belongsTo(models.recipe, {foreignKey: 'id_recipe'});
    };
    return Message;
};