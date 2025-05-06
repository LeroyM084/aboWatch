const User = require('../models/user');
const Abonnements = require('../models/abonnements');
const { Op } = require('sequelize'); // Assurez-vous d'importer Op pour les opérations de comparaison
const sequelize = require('../config/dbConfig'); // Assurez-vous que sequelize est importé

const setUpdatabase = async () => {
    await sequelize.authenticate();

    // INSÉRER UN UTILISATEUR DE TEST 
    const userTest = await User.create({
        username: 'testuser',
        hashedPassword: 'testPassword'
    });

    await Abonnements.create({
        userId: userTest.id, 
        name: 'testAbonnement',
        price: 10,
        date: 1
    });
};

const cleanUpDatabase = async () => {
    // SUPPRIMER TOUS LES UTILISATEURS ET ABONNEMENTS
    await User.destroy({ where: {} });
    await Abonnements.destroy({ where: {} });
};

const cleanUpDatabaseAfter_createUser = async () => {
    // SUPPRIMER TOUS LES UTILISATEURS CRÉÉS PENDANT LES TESTS
    await User.destroy({
        where: {
            username: {
                [Op.like]: 'APITESTUSER%' // Supprime tous les utilisateurs commençant par "APITESTUSER"
            }
        }
    });
};

module.exports = {
    setUpdatabase,
    cleanUpDatabase,
    cleanUpDatabaseAfter_createUser
};
