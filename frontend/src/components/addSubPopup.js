import React, { useState } from 'react';
import '../style/AddSubPopup.css';
import { X } from 'lucide-react';
import api from '../services/api';


const AddSubPopup = ({ onClose }) => {
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [recurence, setRecurence] = useState('');
  const [activeSince, setActiveSince] = useState('');
  const [erreur, setErreur] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErreur(null);
    setSuccess(false);

    try {
      const res = await api.post('/api/abonnements/nouvelAbonnement', {
        name: nom,
        price: prix,
        date: recurence,
        activeSince: activeSince ? new Date(activeSince) : null,
      });

      if (res.status === 201) {
        setSuccess(true);
        setNom('');
        setPrix('');
        setRecurence('');
        setActiveSince('');
      } else {
        setErreur("Erreur lors de la création de l'abonnement");
      }
    } catch (err) {
      setErreur("Une erreur est survenue.");
    } finally {
      setLoading(false);
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
        <button className="close-btn" onClick={handleClose}>
          <X size={20} />
        </button>
        <h2>Ajouter un abonnement</h2>
        {erreur && <p className="error">{erreur}</p>}
        {success && <p className="success">Abonnement ajouté avec succès !</p>}
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
            {loading ? 'Chargement...' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubPopup;
