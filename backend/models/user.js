const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Assurez-vous que la configuration sequelize est correcte

const User = sequelize.define('User', {
  // Définition des attributs du modèle (les colonnes de la table)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // L'ID s'incrémente automatiquement
    field: 'userid'
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false, // Le champ username ne peut pas être null
    unique: true, // Le nom d'utilisateur doit être unique
    field: 'username'
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false, // Le mot de passe ne peut pas être null
    field:'hashedpassword'
  },
}, {
  // Options du modèle
  tableName: 'user', // Nom de la table dans la base de données
  timestamps: false, // Désactive la gestion des timestamps (createdAt, updatedAt)
});

module.exports = User;
