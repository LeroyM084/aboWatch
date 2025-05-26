const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

const userRoutes = require('./userRoutes');
const aboRoutes = require('./aboRoutes');
const analyseRoutes = require('./analyse')

// Ce fichier permet de centraliser les routes de l'API. Elles seront transmises à server.js pour petre lancées.
router.use('/users', userRoutes);
router.use('/abonnements', aboRoutes);
router.use('/analyse', analyseRoutes);


// Redirection pour les routes inconnues


module.exports = router;

