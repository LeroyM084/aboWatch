import React from 'react';
import api from '../services/api';
import { useState, useEffect } from 'react';

const Analyse = () => {
    // DONNÉES FETCH A API.GET('/api/analyse')
    // == prixCeMoisCi, prixTotalAnnee, countAbonnementDejaPrevele,prixMoyenAbonnement, releves, abonnementLePlusCher

    const [prixCeMoisCi, setPrixCeMoisCi] = useState(0);
    const [prixTotalAnnee, setPrixTotalAnnee] = useState(0);
    const [countAbonnementDejaPrevele, setCountAbonnementDejaPrevele] = useState(0);
    const [prixMoyenAbonnement, setPrixMoyenAbonnement] = useState(0);
    const [releves, setReleves] = useState([]);
    const [abonnementLePlusCher, setAbonnementLePlusCher] = useState(null);

    useEffect(() => {
        const fetchAnalyseData = async () => {
            try {
                const response = await api.get('/api/analyse');
                const data = response.data;
                console.log('Analyse data:', data);

                setPrixCeMoisCi(data.prixCeMoisCi || 0);
                setPrixTotalAnnee(data.prixTotalAnnee || 0);
                setCountAbonnementDejaPrevele(data.countAbonnementDejaPrevele || 0);
                setPrixMoyenAbonnement(data.prixMoyenAbonnement || 0);
                setReleves(data.releves || []);
                setAbonnementLePlusCher(data.abonnementLePlusCher || null);
            } catch (error) {
                console.error('Erreur lors de la récupération des données d\'analyse:', error);
            }
        };

        fetchAnalyseData();
    }, []);

    return (
        <div>
            <h1>Analyse des Abonnements</h1>
            <p>Prix ce mois-ci: {prixCeMoisCi} €</p>
            <p>Prix total de l'année: {prixTotalAnnee} €</p>
            <p>Nombre d'abonnements déjà prélevés: {countAbonnementDejaPrevele}</p>
            <p>Prix moyen des abonnements: {prixMoyenAbonnement} €</p>

            <h2>Relevés</h2>
            <ul>
                {releves.map((releve, index) => (
                    <li key={index}>{releve.year}-{releve.month}: {releve.price} €</li>
                ))}
            </ul>

            {abonnementLePlusCher && (
                <div>
                    <h2>Abonnement le plus cher</h2>
                    <p>{abonnementLePlusCher.name}: {abonnementLePlusCher.price} €</p>
                </div>
            )}
        </div>
    );

    


}

export default Analyse