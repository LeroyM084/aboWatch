import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './pages/loginForm';
import RegisterForm from './pages/registerForm';
import Presentation from './pages/Presentation';
import Dashboard from './pages/dashboard';
import Analyse from './pages/analyse';
import Layout from './components/Layout';
import './style/App.css';

// On utilise cette fonction pour rediriger vers la page de connexion si l'utilisateur n'est pas connecté
const RequireAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Routes publiques sans Layout */}
          <Route path="/" element={<Presentation />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Routes protégées avec Layout (qui inclut le Header) */}
          <Route path="/dashboard" element={
            <RequireAuth>
              <Layout>
                <Dashboard />
              </Layout>
            </RequireAuth>
          } />

          <Route path='/analyse' element={
            <RequireAuth>
              <Layout>
                <Analyse />
              </Layout>
            </RequireAuth>
          } />

          {/* Vous pouvez ajouter d'autres routes protégées de la même manière */}
          <Route path="/profile" element={
            <RequireAuth>
              <Layout>
                <div className="content-container">
                  <h1>Profil</h1>
                  <p>Page de profil (à implémenter)</p>
                </div>
              </Layout>
            </RequireAuth>
          } />
          
          {/* Redirection pour les routes inconnues */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;