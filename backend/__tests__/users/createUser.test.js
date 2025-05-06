// backend/__tests__/inscription.test.js

const request = require('supertest');
const app = require('../../server');
const User = require('../../models/user');
const { setUpDatabase, cleanUpDatabase, cleanUpDatabaseAfter_createUser } = require('../setupTests');

describe('POST /api/users/inscription', () => {

  afterAll(async () => {
    // Nettoyer la base de données après les tests
    cleanUpDatabaseAfter_createUser();
  });

  test('Devrait créer un nouveau user', async () => {
    const utilisateurValide = {
      username: 'APITESTUSER1',
      password: 'MotDePasseSecurise123'
    };

    const response = await request(app)
      .post('/api/users/inscription')
      .send(utilisateurValide);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Utilisateur créé avec succès');
    expect(response.body.userId).toBeDefined(); // Vérifie que l'ID utilisateur est renvoyé
    expect(response.body.token).toBeDefined();  // Vérifie que le token est renvoyé
  });

  test('Devrait renvoyer une erreur pour champs manquants', async () => {
    const utilisateurInvalide = {
      username: 'APITESTUSER'
    };
    const response = await request(app)
      .post('/api/users/inscription')
      .send(utilisateurInvalide);
    expect(response.statusCode).toBe(400);
    });

    test('Devrait renvoyer une erreur pour username déjà pris', async () => {
    const prepUtilisateurExistant = {
      username: 'APITESTUSER2',
      password : 'MotDePasseSecurise123'
    };
    const utilisateurExistant = {
      username: 'APITESTUSER2',
        password: 'MotDePasseSecurise123'
    };

    await request(app)
      .post('/api/users/inscription')
      .send(prepUtilisateurExistant);
    
    const response = await request(app)
        .post('/api/users/inscription')
        .send(utilisateurExistant);

    expect(response.statusCode).toBe(409);

    });

    test('Devrait renvoyer une erreur pour mot de passe trop court', async () => {
    const utilisateurInvalide = {
      username: 'APITESTUSER3',
        password: '123'
    };
    const response = await request(app)
      .post('/api/users/inscription')
      .send(utilisateurInvalide);

    expect(response.statusCode).toBe(400);
});
    test('Devrait renvoyer une erreur pour nom d\'utilisateur trop court', async () => {
        const utilisateurInvalide = {
        username: 'AP',
            password: 'MotDePasseSecurise123'
        };
        const response = await request(app)
        .post('/api/users/inscription')
        .send(utilisateurInvalide);
        expect(response.statusCode).toBe(400);
    });

    test('Devrait renvoyer une erreur pour mot de passe trop long', async () => {
        const utilisateurInvalide = {
        username: 'APITESTUSER4',
        password: 'a'.repeat(129) // 129 caractères
        };
        const response = await request(app)
        .post('/api/users/inscription')
        .send(utilisateurInvalide);

        expect(response.statusCode).toBe(400);
    });

    test('Devrait renvoyer une erreur pour nom d\'utilisateur trop long', async () => {
        const utilisateurInvalide = {
        username: 'a'.repeat(129), // 129 caractères
        password: 'MotDePasseSecurise123'
        };
        const response = await request(app)
        .post('/api/users/inscription')
        .send(utilisateurInvalide);

        expect(response.statusCode).toBe(400);
    });

    test('Devrait renvoyer une erreur si le corps de la requête est invalide', async () => {
      const response = await request(app)
        .post('/api/users/inscription')
        .send('username=APITESTUSER5&password=MotDePasseSecurise123'); // Corps non JSON

      expect(response.statusCode).toBe(400);
    });
});
