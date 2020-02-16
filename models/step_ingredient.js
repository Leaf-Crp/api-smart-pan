module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const StepIngredient = sequelize.define('step_ingredient', {
            id_step: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'step',
                    key: 'id'
                }
            },
            id_ingredient: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'ingredient',
                    key: 'id'
                }
            },
            quantity: DataTypes.INTEGER
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );

    /*   Step.associate = (models) => {
           Step.belongsTo(models.topic, {foreignKey: 'id_topic'});
       };*/
    return StepIngredient;
};