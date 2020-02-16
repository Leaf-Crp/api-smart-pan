module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const RecipeType = sequelize.define('recipe_type', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            label: DataTypes.STRING
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );


    RecipeType.associate = (models) => {
        RecipeType.hasMany(models.recipe, {foreignKey: 'id_recipe_type' });
    };
    return RecipeType;
};