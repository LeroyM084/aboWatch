// backend/server.js

const express = require('express');
const cors = require('cors');
const router = require('./routes/router'); // Assure-toi que le chemin est correct

const app = express();
const PORT = 4500;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    app.use((req, res, next) => {
        //console.log(`${req.method} ${req.url}`);
        next();
    });
}

// Routes
app.use('/api', router);

// Exporter l'app pour utilisation dans les tests
module.exports = app;
