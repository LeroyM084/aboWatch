const app = require('../../server');
const { cleanUpDatabaseAfter_createUser } = require('../setupTests');
const request = require('supertest');

// Ce fichier contient 3 tests
// Ce fichier définit les tests pour la route PUT /api/abonnements/:id

describe('PUT /api/abonnements/:id', () => {
    let token;
    let userId;
    let abonnementId;


    beforeAll(async () => {
        // Nettoyer la base de données avant les tests
        await cleanUpDatabaseAfter_createUser();
        // Créer un user de tests
        const utilisateurValide = {
            username: 'APITESTUSER00',
            password: 'MotDePasseSecurise123'
        };
        const responseUser = await request(app)
            .post('/api/users/inscription')
            .send(utilisateurValide);


        token = responseUser.body.token;
        userId = responseUser.body.userId;


        const abonnementValide = {
            userId: userId,
            name: 'Abonnement Test',
            price: 10,
            date: 10
        }

        const responseAbonnement = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementValide);

        abonnementId = responseAbonnement.body.subId;
    }
    );
    afterAll(async () => {
        // Nettoyer la base de données après les tests
        await cleanUpDatabaseAfter_createUser();
    }
    );

    // --- TESTS --- 

    test('Devrait mettre à jour l\'abonnement', async () => {
        const abonnementMisAJour = {
            name: 'Abonnement Test',
            price: 20,
            date: 15
        };

        const response = await request(app)
            .put(`/api/abonnements/mesAbonnements/${abonnementId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementMisAJour);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Abonnement modifié avec succès');

    });

    test('Devrait retourner une erreur 404 si l\'abonnement n\'existe pas', async () => {
        const abonnementInexistantId = 99999;
        const abonnementMisAJour = {
            name: 'Abonnement Test Modifié',
            price: 20,
            date: 15
        };

        const response = await request(app)
            .put(`/api/abonnements/mesAbonnements/${abonnementInexistantId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementMisAJour);

        expect(response.statusCode).toBe(404);
    }
    );

    test('Devrait retourner une erreur 400 si les champs requis sont manquants', async () => {
        const abonnementMisAJour = {
            name: 'Abonnement Test Modifié',
            price: 20
            // date est manquant
        };

        const response = await request(app)
            .put(`/api/abonnements/mesAbonnements/${abonnementId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(abonnementMisAJour);

        expect(response.statusCode).toBe(400);
    }
    );
});
