import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import '../style/LoginForm.css'; // Nous allons créer ce fichier CSS

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/api/users/connexion', { username, password });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('username', response.data.username) // Probleme depuis que j'ai ajouter depuis cette ligne
      window.location.href = '/dashboard';
    } catch (err) {
      // Amélioration de la gestion des erreurs
      if (err.response && err.response.status === 401) {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      } else {
        setError('Erreur serveur. Veuillez réessayer plus tard.');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>ABOWATCH</h2>
          <p className="login-subtitle">Bienvenue sur notre plateforme</p>
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
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
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
              placeholder="Entrez votre mot de passe"
              required
              className="form-control"
            />
          </div>
          
          <button 
            type="submit" 
            className={`login-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            Pas encore de compte ? <Link to="/register" className="register-link">Inscrivez-vous ici</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;