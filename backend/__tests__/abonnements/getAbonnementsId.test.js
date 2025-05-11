const request = require('supertest');
const app = require('../../server');
const { cleanUpDatabaseAfter_createUser } = require('../setupTests');

// Ce fichier contient 4 tests

describe('GET /api/abonnements/mesAbonnements/:id', () => {
    let token;
    let userId;
    let abonnementId;

    beforeAll(async () => {
        // Nettoyer la base de données avant les tests
        await cleanUpDatabaseAfter_createUser();

        // Créer un utilisateur de test
        const utilisateurValide = {
            username: 'APITESTUSER5',
            password: 'MotDePasseSecurise123'
        };

        const response = await request(app)
            .post('/api/users/inscription')
            .send(utilisateurValide);

        token = response.body.token;
        userId = response.body.userId;

        // Créer un abonnement de test
        const abonnementValide = {
            userId: userId,
            name: 'Abonnement Test',
            price: 10,
            date: 10
        };

        const responseAbonnement = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementValide);

        abonnementId = responseAbonnement.body.subId;
    });

    afterAll(async () => {
        // Nettoyer la base de données après les tests
        await cleanUpDatabaseAfter_createUser();
    });

    test('Devrait afficher les données de l\'abonnement test', async () => {
        const response = await request(app)
            .get(`/api/abonnements/mesAbonnements/${abonnementId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', abonnementId);
        expect(response.body).toHaveProperty('name', 'Abonnement Test');
        expect(response.body).toHaveProperty('price', 10);
        expect(response.body).toHaveProperty('date', 10);
    });

    test('Devrait renvoyer une erreur pour mauvais token', async () => {
        const response = await request(app)
            .get(`/api/abonnements/mesAbonnements/${abonnementId}`)
            .set('Authorization', `Bearer ${token}123`); // Token invalide

        expect(response.statusCode).toBe(403);
        expect(response.body.error).toBe('Token invalide ou expiré');
    });

    test('Devrait renvoyer une erreur pour abonnement non trouvé', async () => {
        const response = await request(app)
            .get(`/api/abonnements/mesAbonnements/999999`) // ID inexistant
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Abonnement non trouvé');
    });

    test('Devrait renvoyer une erreur pour utilisateur non associé à l\'abonnement', async () => {
        // Créer un autre utilisateur
        const autreUtilisateur = {
            username: 'APITESTUSER99',
            password: 'MotDePasseSecurise123'
        };

        const responseAutreUtilisateur = await request(app)
            .post('/api/users/inscription')
            .send(autreUtilisateur);

        const autreToken = responseAutreUtilisateur.body.token;

        // Tenter d'accéder à l'abonnement avec un autre utilisateur
        const response = await request(app)
            .get(`/api/abonnements/mesAbonnements/${abonnementId}`)
            .set('Authorization', `Bearer ${autreToken}`);

        expect(response.statusCode).toBe(404);
    });
});



