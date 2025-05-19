import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import '../style/RegisterForm.css'; // Nous allons utiliser le même style que LoginForm avec quelques ajustements

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      await api.post('/auth/register', { username, password });
      setSuccessMessage('Compte créé avec succès !');
      setError('');
      // Réinitialiser les champs du formulaire après une inscription réussie
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erreur lors de l\'inscription. Essayez un autre nom d\'utilisateur.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Inscription</h2>
          <p className="register-subtitle">Rejoignez notre plateforme</p>
        </div>
        
        {error && (
          <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="success-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choisissez votre nom d'utilisateur"
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Créez votre mot de passe"
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              required
              className="form-control"
            />
          </div>
          
          <button 
            type="submit" 
            className={`register-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
        </form>
        
        <div className="register-footer">
          <p>
            Déjà inscrit ? <Link to="/" className="login-link">Connectez-vous ici</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;