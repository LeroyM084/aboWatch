const request = require('supertest');
const app = require('../../server');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { cleanUpDatabaseAfter_createUser } = require('../setupTests');

// Ce fichier contient 4 tests

describe('POST /api/users/connexion', () => {
  beforeAll(async () => {
    const utilisateurValide = {
        username: 'APITESTUSER4',
        password: 'MotDePasseSecurise123'
      };
  
      await request(app)
        .post('/api/users/inscription')
        .send(utilisateurValide);
  });

  afterAll(async () => {
    // Nettoyer la base de données après les tests
    await cleanUpDatabaseAfter_createUser();
  }
  );

  test('Devrait réussir la connexion avec des identifiants valides', async () => {
    const utilisateurValide = {
      username: 'APITESTUSER4',
      password: 'MotDePasseSecurise123'
    };

    const response = await request(app)
      .post('/api/users/connexion')
      .send(utilisateurValide);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Connexion réussie');
    expect(response.body.userId).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  test('Devrait renvoyer une erreur si l\'utilisateur n\'existe pas', async () => { // OK
    const utilisateurInvalide = {
      username: 'UtilisateurInexistant',
      password: 'MotDePasseSecurise123'
    };

    const response = await request(app)
      .post('/api/users/connexion')
      .send(utilisateurInvalide);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Utilisateur non trouvé');
  });

  test('Devrait renvoyer une erreur si le mot de passe est incorrect', async () => {
    const utilisateurInvalide = {
      username: 'APITESTUSER4',
      password: 'MotDePasseIncorrect'
    };

    const response = await request(app)
      .post('/api/users/connexion')
      .send(utilisateurInvalide);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Mot de passe incorrect');
  });

  test('Devrait renvoyer une erreur pour des champs manquants', async () => { // OK
    const utilisateurInvalide = {
      username: 'APITESTUSER'
    };

    const response = await request(app)
      .post('/api/users/connexion')
      .send(utilisateurInvalide);

    expect(response.statusCode).toBe(400);
  });
});