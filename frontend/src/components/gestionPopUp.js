import React, { useState } from 'react';
import api from '../services/api';
import '../style/AddSubPopup.css';
import '../style/gestionPopUp.css';

const GestionPopUp = ({ abonnement, onClose }) => {
  const [nom, setNom] = useState(abonnement.name);
  const [prix, setPrix] = useState(abonnement.price);
  const [recurence, setRecurence] = useState(abonnement.date);
  const [activeSince, setActiveSince] = useState(abonnement.activeSince);
  const [erreur, setErreur] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErreur(null);
    setSuccess(false);

    try {
      const res = await api.put(`/api/abonnements/mesAbonnements/${abonnement.id}`, {
        name: nom,
        price: prix,
        date: recurence,
        activeSince: activeSince ? new Date(activeSince) : null,
      });

      if (res.status === 200) {
        setSuccess(true);
        onClose();
      } else {
        setErreur("Erreur lors de la mise à jour de l'abonnement");
      }
    } catch (err) {
      setErreur("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/api/abonnements/mesAbonnements/${abonnement.id}`);
      if (res.status === 200 || res.status === 204) {
        onClose();
      } else {
        setErreur("Erreur lors de la suppression de l'abonnement");
      }
    } catch (err) {
      setErreur("Une erreur est survenue lors de la suppression.");
    }
  };

  const handleClose = () => {
    setNom('');
    setPrix('');
    setRecurence('');
    setActiveSince('');
    setErreur(null);
    setSuccess(false);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Modifier l'abonnement</h2>
        {erreur && <p className="error">{erreur}</p>}
        {success && <p className="success">Abonnement modifié avec succès !</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom de l'abonnement"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Prix en €"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Date du prélèvement (ex : le 4 de chaque mois)"
            value={recurence}
            onChange={(e) => setRecurence(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Date d'activation"
            value={activeSince}
            onChange={(e) => setActiveSince(e.target.value)}
            className="date-input"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Chargement...' : 'Modifier'}
          </button>
        </form>

        <button className="delete-btn" onClick={() => setConfirmationVisible(true)}>
          Supprimer l'abonnement
        </button>

        {confirmationVisible && (
          <div className="confirmation-popup">
            <p>Êtes-vous sûr de vouloir supprimer cet abonnement ?</p>
            <button onClick={handleDelete}>Oui, supprimer</button>
            <button onClick={() => setConfirmationVisible(false)}>Annuler</button>
          </div>
        )}

        <button className="close-btn" onClick={handleClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default GestionPopUp;
