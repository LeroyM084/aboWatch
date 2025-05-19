import React, { useState } from 'react';
import api from '../services/api'; // Assure-toi que le fichier api.js est bien importé
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await api.post('/auth/register', { username, password });
      setSuccessMessage('Compte créé avec succès !');
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'inscription. Essayez un autre nom d\'utilisateur.');
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmer le mot de passe"
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <p>
      Déjà inscrit ? <Link to="/">Connecte toi ici</Link>
    </p>
    </div>
  );
};

export default RegisterForm;
