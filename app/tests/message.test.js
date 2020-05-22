// Import the mock library
var SequelizeMock = require('sequelize-mock');
// Setup the mock database connection
var DBConnectionMock = new SequelizeMock();

describe("Test classe Messafe", () => {
    it("Récupération d'un message par l'identifiant", async () => {
        var UserMock = DBConnectionMock.define('message', {
            'id': '1',
            'content': 'Bonjour',
            'id_recipe': '1',
            'id_user': '1',
            'date': '10-10-1010'
        }, {
            instanceMethods: {
                myTestFunc: function () {
                    console.log('instancied object test');
                },
            },
        });
        let message = await UserMock.findOne({
            where: {
                id: '1',
            },
        });
        expect(message.id_recipe).toBeDefined();
    })
});