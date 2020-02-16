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
            id_prerequisite_type : {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'ingredient',
                    key: 'id'
                }
            },
            detail: DataTypes.STRING
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );

    return StepIngredient;
};