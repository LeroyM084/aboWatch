import React, {useState} from 'react';
import '../style/AddSubPopup.css';
import api from '../services/api';

const AddSubPopup = ({ onClose }) => {
    const [nom, setNom] = useState('');
    const [prix, setPrix] = useState('');
    const [recurence, setRecurence] = useState('');
    const [erreur, setErreur] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault(); // ← ajoute ça pour empêcher le reload
    setLoading(true);
    setErreur(null);
    setSuccess(false);

    try {
        const res = await api.post('/api/abonnements/nouvelAbonnement', {
            name: nom,
            price: prix,
            date: recurence
        });

        if (res.status === 201) {
            setSuccess(true);
            setNom('');
            setPrix('');
            setRecurence('');
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
        setErreur(null);
        setSuccess(false);
        onClose();
    }

    return (
        <div className="popup">
            <div className="popup-content">
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
                        placeholder="Fréquence de renouvellement (ex: 1 mois)"
                        value={recurence}
                        onChange={(e) => setRecurence(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Chargement...' : 'Ajouter'}
                    </button>
                </form>
                <button className="close-btn" onClick={handleClose}>Fermer</button>
            </div>
        </div>
    );
}

export default AddSubPopup;


