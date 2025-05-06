// backend/server.js

const express = require('express');
const cors = require('cors');
const router = require('./routes/router'); // Assure-toi que le chemin est correct

const app = express();
const PORT = 4500;

// Middlewares
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', router);

const afficherRoutes = (prefix, stack) => {
  stack.forEach(middleware => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
      console.log(`[${methods}] ${prefix}${middleware.route.path}`);
    } else if (middleware.name === 'router' && middleware.handle.stack) {
      afficherRoutes(prefix, middleware.handle.stack);
    }
  });
};

afficherRoutes('/api', router.stack);

// Exporter l'app pour utilisation dans les tests
module.exports = app;
