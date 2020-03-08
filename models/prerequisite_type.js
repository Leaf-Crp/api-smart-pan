module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const PrerequisiteType = sequelize.define('prerequisite_type', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            label: DataTypes.STRING,
            code: DataTypes.STRING

        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );

    PrerequisiteType.associate = (models) => {
        PrerequisiteType.belongsToMany(models.step, {
            through: 'prerequisite_type_step',
            as: 'steps',
            foreignKey: 'id_prerequisite_type'
        });
        PrerequisiteType.hasMany(models.prerequisite_type_step, {foreignKey: 'id_step'});

    };
    return PrerequisiteType;
};