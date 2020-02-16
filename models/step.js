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
        Step.belongsToMany(models.ingredient, {
            through: models.step_ingredient,
            foreignKey: 'id_step',
            as: 'ingredients'
        });
    };

    /*   Step.associate = (models) => {
           Step.belongsTo(models.topic, {foreignKey: 'id_topic'});
       };*/
    return Step;
};