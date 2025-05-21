import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../style/Header.css';
import api from '../services/api'

/**
 * Composant Header réutilisable pour les pages authentifiées
 * Déjà inclus dans le Layout, donc sera affiché uniquement pour les utilisateurs connectés
 */
const Header = () => {
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook pour obtenir l'emplacement actuel

  // Récupération du nom d'utilisateur
  useEffect(() => {
    // On récupère l'username de l'utilisateur. 
    const username = localStorage.getItem('username') || 'Utilisateur';
    setUsername(username);
  }, []);

  // Gestion de la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    navigate('/login'); // Redirection vers la page de connexion
  };

  // Toggle du menu déroulant sur mobile
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fonction pour vérifier si le lien correspond à la page active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/dashboard" className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>AboWatch</span>
          </Link>
        </div>

        {/* Menu pour écrans larges */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li>
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Tableau de bord
              </Link>
            </li>
            <li>
              <Link 
                to="/profile" 
                className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
              >
                Profil
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                className={`nav-link ${isActive('/settings') ? 'active' : ''}`}
              >
                Paramètres
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bouton hamburger pour mobile */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="user-actions">
          <div className="user-info">
            <span className="welcome-text">Bonjour, </span>
            <span className="username">{username}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Menu mobile qui s'affiche/masque selon l'état */}
      <div className={`mobile-nav ${menuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <Link 
              to="/dashboard" 
              className={`mobile-nav-link ${isActive('/dashboard') ? 'active' : ''}`} 
              onClick={toggleMenu}
            >
              Tableau de bord
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className={`mobile-nav-link ${isActive('/profile') ? 'active' : ''}`} 
              onClick={toggleMenu}
            >
              Profil
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className={`mobile-nav-link ${isActive('/settings') ? 'active' : ''}`} 
              onClick={toggleMenu}
            >
              Paramètres
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;