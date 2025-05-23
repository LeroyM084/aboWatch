import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import AbonnementCard from '../components/Card';
import api from '../services/api';

const Dashboard = () => {
  const [abonnements, setAbonnements] = useState([]);

  useEffect(() => {
    const fetchAbonnements = async () => {
      try {
        const response = await api.get('/api/abonnements/mesAbonnements');
        setAbonnements(response.data);
      } catch {
        setAbonnements([]);
      }
    };

    fetchAbonnements();
  }, []);

  const formaterNomPourLogo = (nom) =>
    `https://logo.clearbit.com/${nom
      .replace(/\s+/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')}.com`;

  return (
    <div>
      {abonnements.map((abonnement, index) => (
        <AbonnementCard
          key={abonnement.id || index}
          titre={abonnement.name}
          logo={formaterNomPourLogo(abonnement.name)}
          price={abonnement.price}
          recurence={abonnement.recurence || ''}
        />
      ))}
    </div>
  );
};

export default Dashboard;
