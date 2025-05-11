const User = require('../models/user');
const Abonnements = require('../models/abonnements');
const { Op } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Assurez-vous que sequelize est importé

const cleanUpDatabaseAfter_createUser = async () => {
    // Supprimer les abonnements liés aux utilisateurs de test
    
    const userIds = APITESTUSER_IDS.map(abonnement => abonnement.userId);      
    await Abonnements.destroy({
        where: {
            name: "Abonnement Test",
        }
    });

    // Supprimer les utilisateurs de test
    await User.destroy({
        where: {
            username: {
                [Op.like]: 'APITESTUSER%' // Supprime tous les utilisateurs commençant par "APITESTUSER"
            }
        }
    });
};

module.exports = {
    cleanUpDatabaseAfter_createUser
};
