import axios from 'axios'

// Ce fichier établit les requêtes APIs envoyés au back, ainsi que le token si nécéssaire. 

// Créer la connexion a l'API
const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers:{
        'Content-Type': 'application/json'
    }
});

// Ajoute le token si il y en a un. 
api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
});

export default api;