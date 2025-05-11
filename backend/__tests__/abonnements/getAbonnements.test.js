const request = require('supertest');
const app = require('../../server');
const { cleanUpDatabaseAfter_createUser } = require('../setupTests');

// Ce fichier contient x tests

describe('GET /api/abonnements/mesAbonnements', () => {
    let token;
    let userId;

    beforeAll(async () => {
        // On nettoie la base de données avant
        await cleanUpDatabaseAfter_createUser();

        // Créer un utilisateur de tests
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

        await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementValide);
    });

    afterAll(async () => {
        // Nettoyer la base de données après les tests
        await cleanUpDatabaseAfter_createUser();
    }
    );

    test('Devrait récupérer les abonnemnents de l\'utilisateur test', async () => {
        const response = await request(app)
            .get('/api/abonnements/mesAbonnements')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: userId });

        expect(response.statusCode).toBe(200);
    }
    );

    test('Devrait renvoyer une erreur pour mauvais token', async () => {
        const response = await request(app)
            .get('/api/abonnements/mesAbonnements')
            .set('Authorization', `Bearer ${token}123`)
            .send({ userId: userId });

        expect(response.statusCode).toBe(403);
    }
    );

    test('Devrait renvoyer une erreur pour utilisatuer inexistants', async () => {
        const response = await request(app)
            .get('/api/abonnements/mesAbonnements')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: 9999999 }); // ID utilisateur qui n'existe pas

        expect(response.statusCode).toBe(404);
    }
    );
});