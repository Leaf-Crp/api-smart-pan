// Import the mock library
var SequelizeMock = require('sequelize-mock');
// Setup the mock database connection
var DBConnectionMock = new SequelizeMock();
describe("Test classe User", () => {
    it("Should get value from mock", async () => {
        var UserMock = DBConnectionMock.define('message', {
            'id': '1',
            'email': 'bonjour@bonjour.fr',
            'firstname': 'bonjour',
            'lastname': 'bonjour'
        });
        let message = await UserMock.findAll();
        expect(message).toBeDefined();
    })
});