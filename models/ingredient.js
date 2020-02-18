module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const Ingredient = sequelize.define('ingredient', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            image: DataTypes.STRING,
            label: DataTypes.STRING
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );

    Ingredient.associate = (models) => {
        Ingredient.belongsToMany(models.step, {
            through: 'step_ingredient',
            as: 'steps',
            foreignKey: 'id_ingredient',
        });
    };
    return Ingredient;
};