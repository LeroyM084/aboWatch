// backend/start.js

const app = require('./server');  // Importer la configuration du serveur
const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`✅ AboWatch en ligne : http://localhost:${PORT}`);
  });
  