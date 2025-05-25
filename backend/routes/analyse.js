const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Abonnement = require('../models/abonnements');
const Releves = require('../models/releves');

const tokenValidation = require('../middleware/tokenValidation');

const datTypeValidation = require('../middleware/dataTypeValidation');
const schemaAnalyse = require('../middleware/schemas/analyse');

router.get('/', 
    tokenValidation,
    dataTypeValidation(schemaAnalyse),
    async(req,res) => {
        const userId = req.userId;

        try {
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            // récupération des abonnements de l'utilisateur. 
            const abonnements = await Abonnement.findAll({
                where: { userId: userId }
            });

            if (!abonnements || abonnements.length === 0) {
                return res.status(404).json({ error: 'Aucun abonnement trouvé pour cet utilisateur' });
            }

            // FORMULE POUR CALCUER LE SOMME DE TOUS ABONNEMENTS.PRICE 
            const prixCeMoisCi = abonnements.reduce((total, abonnement) => {
                acc + abonnement.price;
            }, 0) // -- IMPORTANT

            // Formule pour calculer la dépense de cette année : 
            const actualYear = new Date().getFullYear();
            const actualMonth = new Date().getMonth() + 1; // Les mois commencent à 0 en JavaScript, donc on ajoute 1
            const actualDay = new Date().getDate(); // On récupère le jour actuel

            const pricDejaPayeCetteAnnee = await Releves.sum('price', {
                where: {
                    userId: userId,
                    year: actualYear,
                    month: {
                        [Op.lte]: actualMonth // On récupère les relevés jusqu'au mois actuel
                    }
                }
            });

            const monthRestant = 12 - actualMonth; // Nombre de mois restants dans l'année
            const prixTotalAnnee = (prixCeMoisCi * monthRestant) + pricDejaPayeCetteAnnee; // -- IMPORTANT

            const countAbonnementDejaPrevele = await Abonnement.count({ // -- IMPORTANT
                where: {
                    userId: userId,
                    date: {
                        [Op.lte]: actualDay // On récupère les abonnements actifs depuis le début de l'année
                    }
                }
            })

            const prixMoyenAbonnement = prixCeMoisCi / abonnements.length; // -- IMPORTANT
            const releves = await Releves.findMany({ // -- IMPORTANT
                where: { userId: userId },
                limit: 12, // Limite à 12 relevés (un par mois)
                order: [['year', 'DESC'], ['month', 'DESC']] // Tri par année et mois décroissants
            })

            const abonnementLePluscher = await Abonnement.findOne({ // -- IMPORTANT
                where : { userId: userId },
                order: [['price', 'DESC']], // Tri par prix décroissant
                limit:1
            })

            return res.status(200).json({
                message: 'Analyse des abonnements réussie pour l\(utilisateur (id:' + userId + ')',
                prixCeMoisCi: prixCeMoisCi,
                prixTotalAnnee : prixTotalAnnee,
                countAbonnementDejaPrevele: countAbonnementDejaPrevele,
                prixMoyenAbonnement: prixMoyenAbonnement,
                releves: releves,
                abonnementLePluscher: abonnementLePluscher,
            })
    } catch(error){
        console.error('Erreur lors de la récupération des abonnements:', error);
        return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}
)