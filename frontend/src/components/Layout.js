import React from 'react';
import Header from './Header';
import './style/Layout.css';

/**
 * Composant Layout qui encapsule le Header et le contenu des pages authentifiées
 * À utiliser uniquement pour les pages où l'utilisateur est connecté
 */
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;