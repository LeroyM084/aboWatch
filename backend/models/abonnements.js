const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Assurez-vous que la configuration sequelize est correcte

const Abonnements = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // L'ID s'incrémente automatiquement
    field: 'aboid'
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false, // Le champ userId ne peut pas être null
    field: 'userid',
    references: {
      model: 'user', // Nom de la table référencée
      key: 'id' // Clé primaire de la table référencée
    }
  },
  name : {
    type: DataTypes.STRING,
    allowNull: false, // Le champ name ne peut pas être null
    field: 'aboname'
  },
  price : {
    type: DataTypes.INTEGER,
    allowNull: false, // Le champ price ne peut pas être null
    field: 'aboprice'
  },
  date : {
    type: DataTypes.INTEGER,
    allowNull: false, // Le champ date ne peut pas être null
    field: 'abodate'
  },
  activeSince:{
    type :DataTypes.DATE,
    allowNull: false,
    field: 'activesince',
    defaultValue: DataTypes.NOW // Valeur par défaut à la date actuelle
  }
}, {
  // Options du modèle
  tableName: 'abonnements', // Nom de la table dans la base de données
  timestamps: false, // Désactive la gestion des timestamps (createdAt, updatedAt)
});

module.exports = Abonnements;
