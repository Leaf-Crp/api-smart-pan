module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const Recipe = sequelize.define('recipe', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            label: DataTypes.STRING,
            image: DataTypes.STRING,
            is_private: DataTypes.INTEGER,
            id_recipe_type: DataTypes.INTEGER,
            id_user: DataTypes.INTEGER
        },
        {
            freezeTableName: true,
            timestamps: false,
            hierarchy: true
        }
    );

    Recipe.associate = (models) => {
        Recipe.hasMany(models.step, {foreignKey: 'id_recipe' });
        Recipe.hasMany(models.message, {foreignKey: 'id_recipe' });

        Recipe.belongsTo(models.user, {foreignKey: 'id_user'});
        Recipe.belongsTo(models.recipe_type, {foreignKey: 'id_recipe_type'});
        Recipe.belongsToMany(models.user, { through: 'user_cooked_recipe',  foreignKey: 'id_user' });
    };

    return Recipe;
};