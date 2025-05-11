// On définit que ce fichier sera un routeur express
const express = require('express');
const router = express.Router();

// On importe la base de données, les modèles de données, les schémas de données, la fonction de validation des schémas.
const db = require('../config/dbConfig');
const sequelize = require('sequelize');
const User = require('../models/user');
const { 
    schemaUser,
    schemaUserModif
    } = require('../middleware/schema');
const dataTypeValidation = require('../middleware/dataTypeValidation');
const tokenValidation = require('../middleware/tokenValidation');

// On importe bcrypt qui servira à hasher le mot de passe et on définit sa force
const bcrypt = require('bcrypt');
const BCRYPT_FORCE = 10;

// On importe JWT pour génerer les tokens d'authentification
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

// On importe la validation du token utilisateur pour mettre à jour les données 

// Ce fichier définit les routes de l'API pour la gestion des utilisateurs
// Les routes des abonnements sont définies dans ./aboRoutes.js

// Page d'accueil API
router.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API d\'AboWatch !');
});

// INSCRIPTION avec sequelize 
router.post ('/inscription', 
    dataTypeValidation(schemaUser),
    async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password)
        return res.status(400).json({ error: 'Champs requis manquants' });
    
    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) 
            {
            return res.status(409).json({ error: 'Nom d\'utilisateur déjà pris' });
        } 
        hashedPassword = await bcrypt.hash(password, BCRYPT_FORCE);
        const user = await User.create({ username, hashedPassword });
        

        // Génération du token JWT
        const token = jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: '1h' });
    
        res.status(201).json({
        message: 'Utilisateur créé avec succès',
        userId: user.id,
        token
        });
    } catch (err) {
        console.error('Erreur création utilisateur :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
    }
);

// Connexion avec sequelize 

router.post('/connexion', 
    dataTypeValidation(schemaUser),
    async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password)
        return res.status(400).json({ error: 'Champs requis manquants' });
    
    try {
        const user = await User.findOne({ where: { username } });
    
        if (!user)
        return res.status(401).json({ error: 'Utilisateur non trouvé' });
        
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
    
        if (!isMatch)
        return res.status(401).json({ error: 'Mot de passe incorrect' });
    
        const token = jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: '1h' });
    
        res.status(200).json({
        message: 'Connexion réussie',
        userId: user.id,
        token
        });
    } catch (err) {
        console.error('Erreur connexion utilisateur :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Modification du mot de passe et/ou du nom de l'utilisateur avec sequelize
router.put('/userModification', 
    tokenValidation, 
    dataTypeValidation(schemaUserModif),
    async (req, res) => {
    const userId = req.userId;
    const { username, password } = req.body;
    
    if (!username && !password)
        return res.status(400).json({ error: 'Aucune données à modifier' });
    
    try {
        const user = await User.findByPk(userId);
    
        if (!user)
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
    
        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, BCRYPT_FORCE);
    
        await user.save();
    
        res.status(200).json({
        message: 'Utilisateur modifié avec succès',
        userId: user.id
        });
    } catch (err) {
        console.error('Erreur modification utilisateur :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Récupération du nom de l'utilisateur grâce à son ID avec sequelize 
router.get('/user/:id', 
    tokenValidation, 
    async (req, res) => {
    const userId = req.params.id;
    
    try {
        const user = await User.findByPk(userId);
    
        if (!user)
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
    
        res.status(200).json({
        message: 'Utilisateur récupéré avec succès',
        username: user.username
        });
    } catch (err) {
        console.error('Erreur récupération utilisateur :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;