const {DataTypes} = require('sequelize');
const sequelize = require('../config/dbConfig');

const Releves = sequelize.define('Releves', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // L'ID s'incrémente automatiquement
        field: 'id'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Le champ userId ne peut pas être null
        field: 'userid',
        references: {
            model: 'user', // Nom de la table référencée
            key: 'id' // Clé primaire de la table référencée
        }
    },
    month: {
        type: DataTypes.INTEGER,
        allowNull: false, // Le champ month ne peut pas être null
        field: 'mois',
        validate :{
            isInt: true, // Doit être un entier
            min: 1, // Minimum 1 (janvier)
            max: 12 // Maximum 12 (décembre)
        }
    },
    year : {
        type: DataTypes.INTEGER,
        allowNull: false, // Le champ year ne peut pas être null
        field: 'year',
        validate :{
            isInt: true, // Doit être un entier
            min: 1000, // Minimum 2000
            max: new Date().getFullYear() // Maximum l'année actuelle
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false, // Le champ price ne peut pas être null
        field: 'price'
    }
},{
  // Options du modèle
  tableName: 'releves', // Nom de la table dans la base de données
  timestamps: false, // Désactive la gestion des timestamps (createdAt, updatedAt)
})

module.exports = Releves;