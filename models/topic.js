module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const Topic = sequelize.define('topic', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING,
            content: DataTypes.TEXT
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );

    Topic.associate = (models) => {
        //Topic.hasMany(models.message, {foreignKey: 'id_topic' });
        Topic.belongsTo(models.user, {foreignKey: 'id_user'});
        Topic.belongsTo(models.recipe, {foreignKey: 'id_recipe'});
    };

    return Topic;
};