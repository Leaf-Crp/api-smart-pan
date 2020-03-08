module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const PrerequisiteTypeStep = sequelize.define('prerequisite_type_step', {
            id_step: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'step',
                    key: 'id'
                }
            },
            id_prerequisite_type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'prerequisite_type',
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
    PrerequisiteTypeStep.associate = (models) => {
        PrerequisiteTypeStep.belongsTo(models.prerequisite_type, {foreignKey: 'id_step'});
    };

    return PrerequisiteTypeStep;
};