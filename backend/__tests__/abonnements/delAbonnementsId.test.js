const app = require('../../server');
const { cleanUpDatabaseAfter_createUser } = require('../setupTests');
const request = require('supertest');

// Ce fichier contient 4 tests 
// Ce fichier définit les tests pour la route de suppression d'un abonnement. 

describe("DELETE /api/abonnements/mesAbonnements/:id", () => {
    const URL = "/api/abonnements/mesAbonnements/";
    let userId;
    let token;
    let subscriptionId;

    beforeAll(async () => {
        // On nettoie la base de données avant les tests 
        await cleanUpDatabaseAfter_createUser();


        // Créer un user et un abonnement pour les tests 
        const userValide = {
            username: 'APITESTUSER001',
            password: 'password',
        }

        const resUser = await request(app)
            .post('/api/users/inscription')
            .send(userValide);

        userId = resUser.body.userId;
        token = resUser.body.token;

        const subValide = {
            userId: userId,
            name: "Abonnement Test",
            price: 10,
            date: 10
        }

        const resSub = await request(app)
            .post('/api/abonnements/nouvelAbonnement')
            .set('Authorization', `Bearer ${token}`)
            .send(subValide);

        subscriptionId = resSub.body.subId;

    });

    afterAll(async () => {
        // Nettoyer la base de données après les tests
        await cleanUpDatabaseAfter_createUser(userId);
    }
    );

    // --- TESTS --- 

    test("Devrait supprimer un abonnement existant", async () => {
        const res = await request(app)
            .delete(URL + subscriptionId)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Abonnement supprimé avec succès");
    });

    test("Devrait renvoyer une erreur 404 si abonnement inexistant", async () => {
        const res = await request(app)
            .delete(URL + 99999) // ID d'abonnement inexistant
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Abonnement non trouvé");
    });

    test("Devrait renvoyer 403 pour mauvais token", async () => {
        const res = await request(app)
            .delete(URL + subscriptionId)
            .set('Authorization', `Bearer ${token}invalid`); // Token invalide


        expect(res.statusCode).toBe(403);
    });

    test("Devrait renvoyer une erreur si abonnement non relié à l'utilisateur", async () => {
        // Créer un deuxieme user 
        const userValide2 = {
            username: 'APITESTUSER002',
            password: 'password',
        }

        const resUser2 = await request(app)
            .post('/api/users/inscription')
            .send(userValide2);
        const userId2 = resUser2.body.userId;
        const token2 = resUser2.body.token;

        // Essayer de sup l'abonnement avec le deuxieme user

        const res = await request(app)
            .delete(URL + subscriptionId)
            .set('Authorization', `Bearer ${token2}`); // Token de l'autre utilisateur

        expect(res.statusCode).toBe(404);
    });
});






        