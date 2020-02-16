module.exports = (sequelize, DataTypes) => {
    //https://sequelize.readthedocs.io/en/2.0/api/datatypes/
    const UserCookedRecipe = sequelize.define('user_cooked_recipe', {
            id_step: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'step',
                    key: 'id'
                }
            },
            id_recipe: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'ingredient',
                    key: 'id'
                }
            },
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'ingredient',
                    key: 'id'
                }
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
    return UserCookedRecipe;
};