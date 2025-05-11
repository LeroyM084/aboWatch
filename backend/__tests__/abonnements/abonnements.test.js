const request = require('supertest');
const app = require('../../server');
const { cleanUpDatabaseAfter_createUser } = require('../setupTests');

// Ce fichier contient 11 tests

describe('POST /api/abonnements/nouvelAbonnement', () => {
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
    });

    afterAll(async () => {
        // Nettoyer la base de données après les tests
        await cleanUpDatabaseAfter_createUser();
    }
    );

    test('Devrait créer un nouvel abonnement avec des données valdies', async () => {
        const abonnementValide = {
            userId: userId,
            name: 'Abonnement Test',
            price: 10,
            date: 10
        };
        const response = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementValide);

        expect(response.statusCode).toBe(201);
    });

    test('Devrait renvoyer une erreur pour mauvais token', async () => {
        const abonnementValide = {
            userId: userId,
            name: 'Abonnement Test',
            price: 10,
            date: 10
        };
        const response = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer mauvais_token`)
            .send(abonnementValide);

        expect(response.statusCode).toBe(403);
    });

    test('Devrait renvoyer une erreur pour données manquantes', async () => {
        const abonnementInvalide = {
            userId: userId,
            name: 'Abonnement Test'
            // price et date manquants
        };
        const response = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementInvalide);

        expect(response.statusCode).toBe(400);
    });

    test('Devrait renvoyer une erreur pour données invalides', async () => {
        const abonnementInvalide = {
            userId: userId,
            name: 'Abonnement Test',
            price: 'dix', // prix invalide
            date: 'dix' // date invalide
        };
        const response = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementInvalide);

        expect(response.statusCode).toBe(400);
    });

    test('Devrait renvoyer une erreur pour utilisateur inextistant', async () => {
        const abonnementInvalide = {
            userId: 99999, // ID d'utilisateur inexistant
            name: 'Abonnement Test',
            price: 10,
            date: 10
        };
        const response = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementInvalide);

        expect(response.statusCode).toBe(404);
    }
    );
    test('Devrait renvoyer une erreur car pas de token', async () => {
        const abonnementValide = {
            userId: userId,
            name: 'Abonnement Test',
            price: 10,
            date: 10
        };
        const response = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .send(abonnementValide);

        expect(response.statusCode).toBe(401);
    }
    );
    test('Devrait renvoyer une erreur pour nom trop long', async () => {
        const abonnementInvalide = {
            userId: userId,
            name: 'A'.repeat(256), // Nom trop long
            price: 10,
            date: 10
        };
        const response = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementInvalide);

        expect(response.statusCode).toBe(400);
    }
    );
    test('Devrait renvoyer une erreur pour prix négatif', async () => {
        const abonnementInvalide = {
            userId: userId,
            name: 'Abonnement Test',
            price: -10, // Prix négatif
            date: 10
        };
        const response = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementInvalide);

        expect(response.statusCode).toBe(400);
    }
    );
    test('Devrait renvoyer une erreur pour nom trop court', async () => {
        const abonnementInvalide = {
            userId: userId,
            name: 'A', // Nom trop court
            price: 10,
            date: 10
        };
        const response = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementInvalide);

        expect(response.statusCode).toBe(400);
    }
    );
    test('Devrait renvoyer une erreur pour date invalide', async () => {
        const abonnementInvalide = {
            userId: userId,
            name: 'Abonnement Test',
            price: 10,
            date: 45 // Date invalide
        };
        const response = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementInvalide);

        expect(response.statusCode).toBe(400);
    }
    );
    test('Devrait renvoyer une erreur car trop de champs', async () => {
        const abonnementInvalide = {
            userId: userId,
            name: 'Abonnement Test',
            price: 10,
            date: 10,
            extraField: 'extraValue' // Champ supplémentaire
        };
        const response = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementInvalide);

        expect(response.statusCode).toBe(400);
    }
    );
});


