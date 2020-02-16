module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const PrerequisiteType = sequelize.define('prerequisite_type', {
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

  /*  PrerequisiteType.associate = (models) => {
        PrerequisiteType.hasMany(models.recipe, {foreignKey: 'id_prerequisite_type' });
    };*/
    return PrerequisiteType;
};