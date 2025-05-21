import React from 'react';
import { Link } from 'react-router-dom';

const Presentation = () => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Bienvenue sur aboWatch</h1>
        <p>Veuillez vous connecter ou créer un compte pour continuer.</p>
        <div style={{ marginTop: '30px' }}>
            <Link to="/login">
                <button style={{ marginRight: '15px' }}>Se connecter</button>
            </Link>
            <Link to="/register">
                <button>S'inscrire</button>
            </Link>
        </div>
    </div>
);

export default Presentation;