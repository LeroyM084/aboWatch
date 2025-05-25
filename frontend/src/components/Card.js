import React from 'react';
import '../style/Card.css';
import logoFallback from '../assets/logoFallback.png';

const AbonnementCard = ({ titre, price, recurence, logo, activeSince, onGerer }) => {
  const imageSrc = logo || logoFallback;

  const aujourdHui = new Date();
  const annee = aujourdHui.getFullYear();
  const jourPaiement = Number(recurence);

  let datePaiement = new Date(annee, aujourdHui.getMonth(), jourPaiement);
  if (aujourdHui > datePaiement) {
    datePaiement = new Date(annee, aujourdHui.getMonth() + 1, jourPaiement);
  }
  const moisTexte = datePaiement.toLocaleString('default', { month: 'long' });

  return (
    <div className="abonnement-card">
      <div className="abonnement-logo">
        <img src={imageSrc} alt="Logo abonnement" />
      </div>
      <div className="abonnement-content">
        <div className="abonnement-header">
          <div>
            <h3 className="titre">{titre}</h3>
            <p className="prix">{price}€/mois</p>
          </div>
          <p className="actif-depuis">Actif depuis {activeSince}</p>
        </div>
        <div className="abonnement-footer">
          <p className="frequence">
            Prochain paiement le {jourPaiement} {moisTexte}
          </p>
          <button className="gerer-btn" onClick={onGerer}>
            Gérer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AbonnementCard;
