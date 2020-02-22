module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const Step = sequelize.define('step', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            label: DataTypes.STRING,
            duration: DataTypes.FLOAT,
            id_recipe: DataTypes.INTEGER
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
    Step.associate = (models) => {
        Step.belongsTo(models.recipe, {foreignKey: 'id_recipe'});

        Step.belongsToMany(models.ingredient, {
            through: 'step_ingredient',
            as: 'ingredients',
            foreignKey: 'id_step'
        });
       Step.belongsToMany(models.prerequisite_type, {
          through: 'prerequisite_type_step',
          as: 'prerequisite_type',
          foreignKey: 'id_step'
       });
    };

    return Step;
};