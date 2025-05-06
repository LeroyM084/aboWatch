// Ce fichier contient la fonction de validation du token JWT reçues. 
const JWT_KEY = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');


// Middleware de vérification du token
async function verificationToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Token manquant ou invalide' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalide ou expiré' });
  }
}

module.exports = verificationToken;