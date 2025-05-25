import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import AbonnementCard from '../components/Card';
import AddSubPopup from '../components/addSubPopup';
import api from '../services/api';

const Dashboard = () => {
  const [abonnements, setAbonnements] = useState([]);
  const [popUpVisible, setPopupVisible] = useState(false);

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

  return (
    <div>
      <button onClick={() => setPopupVisible(true)} className="ajouter-btn">
        Ajouter un abonnement
      </button>

      {abonnements.map((abonnement, index) => (
        <AbonnementCard
          key={abonnement.id || index}
          titre={abonnement.name}
          logo={formaterNomPourLogo(abonnement.name)}
          price={abonnement.price}
          recurence={abonnement.recurence || ''}
        />
      ))}

      {popUpVisible && (
        <AddSubPopup
          onClose={() => {
            setPopupVisible(false);
            fetchAbonnements(); // refresh la liste
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
