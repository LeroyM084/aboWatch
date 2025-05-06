// backend/__tests__/connexionDB.test.js
require('dotenv').config();
const sequelize = require('../config/dbConfig');

describe('Connexion à la base de données', () => {
  test('Connexion réussie', async () => {
    await expect(sequelize.authenticate()).resolves.not.toThrow();
    await sequelize.close();
  });
});
