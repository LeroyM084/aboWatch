// Ce fichier sert à valider les données reçues avant de les traiter. 
// Permet d'éviter les erreurs de type 

const JOI = require('joi');

// --- Schémas pour valider les données des routes abonnements ---

// Ce schema s'applique à la création d'un nouvel abonnement.
const schemaNouvelAbonnement = JOI.object({
    userId: JOI.number().integer().positive().required(),
    name: JOI.string().min(3).max(50).required(),
    price: JOI.number().integer().positive().required(),
    date: JOI.number().integer().positive().required().max(31),
}).required();

// Ce schéma s'applique à la récupération de tous les abonnements d'un utilisateur.
const schemaMesAbonnements = JOI.object({
    userId: JOI.number().integer().positive().required(),
}).required();

// Ce schéma s'applique à la récupération d'un abonnement par son ID. 
// Ce schéma s'applique aussi à la suppression d'un abonnement par son ID.
const schemaMesAbonnementsId = JOI.object({}).required();

// Ce schéma s'applique à la modification d'un abonnement par son ID.
const schemaMesAbonnementsIdModifier = JOI.object({
    // subscriptionId: JOI.number().integer().positive().required(),
    name: JOI.string().min(3).max(50).required(),
    price: JOI.number().integer().positive().required(),
    date: JOI.number().integer().positive().required(),
}).required();

// --- Schémas pour valider les données des routes utilisateurs ---

// Ce schéma s'applique à l'inscription d'un nouvel utilisateur.
// Ce schéma s'applique aussi à la connexion d'un utilisateur.
const schemaUser = JOI.object({
    username: JOI.string().min(3).max(50).required(),
    password: JOI.string().min(8).max(100).required(),
}).required();

const schemaUserModif = JOI.object({
    username: JOI.string().min(3).max(50),
    password: JOI.string().min(8).max(100),
}).required();

// --- Exportation des schémas ---

module.exports = {
    schemaNouvelAbonnement,
    schemaMesAbonnements,
    schemaMesAbonnementsId,
    schemaMesAbonnementsIdModifier,
    schemaUser,
    schemaUserModif
};

