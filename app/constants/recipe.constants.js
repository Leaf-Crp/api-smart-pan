import db from "../../models";

let constants = {
    RECIPE_ASSOCIATIONS: {
        attributes: {exclude: ['id_recipe_type', 'id_user']},
        include: [{
            model: db.recipe_type,
            required: true
        }, {
            model: db.user,
            required: true
        },
            {
                model: db.step,
                required: true,
                include: [{
                    model: db.prerequisite_type,
                    as: 'prerequisite_type',
                    through: {
                        attributes: ['detail']
                    },
                },
                    {
                        model: db.ingredient,
                        as: 'ingredients',
                        through: {
                            attributes: ['quantity']
                        },
                    }
                ]
            },
            {
                model: db.message, required: false, include: [{
                    model: db.user
                }]
            }
        ]
    },
    RECIPE_IMAGE_PATH: 'public/uploads/'
};

export default constants;
