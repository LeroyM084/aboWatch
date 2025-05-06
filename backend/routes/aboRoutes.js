// On définit que ce fichier sera un routeur express
const express = require('express');
const router = express.Router();

// On importe la base de données, le modèle de données, la fonction de validation du token de l'utilisateur,
// les schémas de validation des données et la fonction de validation du type de données
const db = require('../config/dbConfig');

const { Subscription } = require('../models/abonnements');

const tokenValidation = require('../middleware/tokenValidation');

const { 
    schemaNouvelAbonnement, 
    schemaMesAbonnements, 
    schemaMesAbonnementsId, 
    schemaMesAbonnementsIdModifier
    } = require('../middleware/schema');
const dataTypeValidation = require('../middleware/dataTypeValidation');

// Ce fichier définit les routes de l'API pour la gestion des abonnements
// Les routes des utilisateurs sont définies dans ./userRoutes.js

// --- Routes --- 

// Ajout d'un nouvel abonnement avec sequelize
router.post('/nouvelAbonnement', 
    tokenValidation, 
    dataTypeValidation(schemaNouvelAbonnement), 
    async (req, res) => {
    const { userId, name, price, date } = req.body;

    if (!userId || !name || !price || !date)
      return res.status(400).json({ error: 'Champs requis manquants' });

    try {
        // Création de l'abonnement avec Sequelize
        const subscription = await Subscription.create({
            userId,
            name: name,    // Assurez-vous que le champ "aboName" existe dans la table
            price: price,  // Pareil pour "aboPrice"
            date: date     // Pareil pour "aboDate"
        });

        res.status(201).json({
            message: 'Abonnement créé avec succès',
            subId: subscription.id  // Utilisation de "subscription.id" pour récupérer l'ID de l'abonnement créé
        });
    } catch (err) {
        console.error('Erreur création abonnement :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Récupération de tous les abonnements d'un utilisateur avec sequelize
router.get('/mesAbonnements', 
    tokenValidation, 
    dataTypeValidation(schemaMesAbonnements),
    async (req, res) => {
    const userId = req.userId;

    try {
        // Récupération des abonnements de l'utilisateur avec Sequelize
        const subscriptions = await Subscription.findAll({
            where: { userId: userId }
        });

        res.status(200).json(subscriptions);
    } catch (err) {
        console.error('Erreur récupération abonnements :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Récupération d'un abonnement par son ID avec sequelize
router.get('/mesAbonnements/:id', 
    tokenValidation, 
    dataTypeValidation(schemaMesAbonnementsId),
    async (req, res) => {
    const userId = req.userId;
    const subscriptionId = req.params.id;

    try {
        // Récupération de l'abonnement par son ID avec Sequelize
        const subscription = await Subscription.findOne({
            where: { id: subscriptionId, userId: userId }
        });

        if (!subscription)
            return res.status(404).json({ error: 'Abonnement non trouvé' });

        res.status(200).json(subscription);
    } catch (err) {
        console.error('Erreur récupération abonnement :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Suppression d'un abonnement par son ID avec sequelize
router.delete('/mesAbonnements/:id', 
    tokenValidation, 
    dataTypeValidation(schemaMesAbonnementsId),
    async (req, res) => {
    const userId = req.userId;
    const subscriptionId = req.params.id;

    try {
        // Suppression de l'abonnement par son ID avec Sequelize
        const deletedCount = await Subscription.destroy({
            where: { id: subscriptionId, userId: userId }
        });

        if (deletedCount === 0)
            return res.status(404).json({ error: 'Abonnement non trouvé' });

        res.status(200).json({ message: 'Abonnement supprimé avec succès' });
    } catch (err) {
        console.error('Erreur suppression abonnement :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Modification d'un abonnement par son ID avec sequelize
router.put('/mesAbonnements/:id', 
    tokenValidation, 
    dataTypeValidation(schemaMesAbonnementsIdModifier),
    async (req, res) => {
    const userId = req.userId;
    const subscriptionId = req.params.id;
    const { name, price, date } = req.body;

    try {
        // Modification de l'abonnement par son ID avec Sequelize
        const [updatedCount] = await Subscription.update(
            { name, price, date },
            { where: { id: subscriptionId, userId: userId } }
        );

        if (updatedCount === 0)
            return res.status(404).json({ error: 'Abonnement non trouvé' });

        res.status(200).json({ message: 'Abonnement modifié avec succès' });
    } catch (err) {
        console.error('Erreur modification abonnement :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;