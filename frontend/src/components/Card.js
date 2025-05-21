import React from 'react';
import '../style/Card.css';
import logoFallback from '../assets/logoFallback.png';

const AbonnementCard = ({ logo }) => {
  const imageSrc = logo || logoFallback;

  return (
    <div className="abonnement-card">
      <div className="abonnement-logo">
        <img src={imageSrc} alt="Logo abonnement" />
      </div>
      <div className="abonnement-content">
        <div className="abonnement-header">
          <div>
            <h3 className="titre">Titre de l'abonnement</h3>
            <p className="prix">9,99€/mois</p>
          </div>
          <p className="actif-depuis">Actif depuis 01/01/2024</p>
        </div>
        <div className="abonnement-footer">
          <p className="frequence">Renouvellement tous les 3 mois</p>
          <button className="gerer-btn">Gérer</button>
        </div>
      </div>
    </div>
  );
};

export default AbonnementCard;
