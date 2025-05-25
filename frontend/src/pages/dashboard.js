import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../style/Dashboard.css';
import AbonnementCard from '../components/Card';
import AddSubPopup from '../components/addSubPopup';
import GestionPopUp from '../components/gestionPopUp'; // correction majuscule
import api from '../services/api';

const Dashboard = () => {
  const [abonnements, setAbonnements] = useState([]);
  const [popUpVisible, setPopupVisible] = useState(false);
  const [gestionPopUpVisible, setGestionPopUpVisible] = useState(false);
  const [abonnementSelectionne, setAbonnementSelectionne] = useState(null);

  const fetchAbonnements = async () => {
    try {
      const response = await api.get('/api/abonnements/mesAbonnements');
      setAbonnements(response.data);
    } catch {
      setAbonnements([]);
    }
  };

  useEffect(() => {
    fetchAbonnements();
  }, []);

  const formaterNomPourLogo = (nom) =>
    `https://logo.clearbit.com/${nom
      .replace(/\s+/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')}.com`;

  const ouvrirGestionPopup = (abonnement) => {
    setAbonnementSelectionne(abonnement);
    setGestionPopUpVisible(true);
  };

  const fermerGestionPopup = () => {
    setGestionPopUpVisible(false);
    setAbonnementSelectionne(null);
    fetchAbonnements();
  };

  return (
      <div className="dashboard">
        <button onClick={() => setPopupVisible(true)} className="ajouter-btn">
          Ajouter un abonnement
        </button>

        {abonnements.length === 0 ? (
          <p className="empty-message">
            C'est vide ici ! Ajoute ton premier abonnement !
          </p>
        ) : (
          <div className="abonnement-list">
            {abonnements.map((abonnement, index) => (
              <AbonnementCard
                key={abonnement.id || index}
                titre={abonnement.name}
                logo={formaterNomPourLogo(abonnement.name)}
                price={abonnement.price}
                recurence={abonnement.date || ''}
                activeSince={abonnement.activeSince}
                onGerer={() => ouvrirGestionPopup(abonnement)}
              />
            ))}
          </div>
        )}

        {popUpVisible && (
          <AddSubPopup
            onClose={() => {
              setPopupVisible(false);
              fetchAbonnements();
            }}
          />
        )}

        {gestionPopUpVisible && abonnementSelectionne && (
          <GestionPopUp
            abonnement={abonnementSelectionne}
            onClose={fermerGestionPopup}
          />
        )}
      </div>
  );
};

export default Dashboard;
