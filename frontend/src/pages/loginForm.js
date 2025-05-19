import React, { useState } from 'react';
import api from '../services/api'; // Assure-toi que le fichier api.js est bien importé
import { Link } from 'react-router-dom';

// Ce fichier définit le formulaire de connexion. 
// Il envoie les données à l'API et récupère la reponse
// Si la réponse est correcte, il renvoie sur le dahsboard et stocke le token
// Sinon, il affiche l'erreur

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // On envoie la requete 
      const response = await api.post('/api/users/connexion', { username, password });
      localStorage.setItem('authToken', response.data.token); // Enregistrer le token dans le localStorage
      window.location.href = '/dashboard'; // Rediriger vers le tableau de bord
    } catch (err) {
        // On définit deux types d'erreur 
        if(err === 401 ){
            setError('Nom d\'utilisateur ou mot de passe incorrect');
        } else {
            setError('Erreur serveur. Veuillez ré-éssayer plus tard.')
        }
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <button type="submit">Se connecter</button>
      </form>
      <p>
      Pas encore de compte ? <Link to="/register">Inscris-toi ici</Link>
    </p>
    </div>
  );
};

export default LoginForm;
