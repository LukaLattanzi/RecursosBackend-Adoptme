import express from 'express';
import request from 'supertest';
import { expect } from 'chai';

import adoptionsRouter from '../src/routes/adoption.router.js';
import { adoptionsService, petsService, usersService } from '../src/services/index.js';
import { globalErrorHandler, notFoundHandler } from '../src/utils/errorHandler.js';

describe('Adoptions API', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/api/adoptions', adoptionsRouter);
        app.all('*', notFoundHandler);
        app.use(globalErrorHandler);
    });

    it('GET /api/adoptions - devuelve lista', async () => {
        const fake = [{ _id: 'a1', owner: 'u1', pet: 'p1' }];
        adoptionsService.getAll = async () => fake;

        const res = await request(app).get('/api/adoptions');

        expect(res.status).to.equal(200);
        expect(res.body.payload).to.be.an('array').with.length(1);
    });

    it('GET /api/adoptions/:aid - 404 si no existe', async () => {
        adoptionsService.getBy = async (q) => null;

        const res = await request(app).get('/api/adoptions/nope');

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'Adoption not found');
    });

    it('GET /api/adoptions/:aid - devuelve adopcion', async () => {
        const adoption = { _id: 'a2', owner: 'u2', pet: 'p2' };
        adoptionsService.getBy = async (q) => adoption;

        const res = await request(app).get('/api/adoptions/a2');

        expect(res.status).to.equal(200);
        expect(res.body.payload).to.deep.equal(adoption);
    });

    it('POST /api/adoptions/:uid/:pid - 404 user not found', async () => {
        usersService.getUserById = async (id) => null;

        const res = await request(app).post('/api/adoptions/nonuser/somepet');

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'user Not found');
    });

    it('POST /api/adoptions/:uid/:pid - 404 pet not found', async () => {
        usersService.getUserById = async (id) => ({ _id: 'u1', pets: [] });
        petsService.getBy = async (q) => null;

        const res = await request(app).post('/api/adoptions/u1/nopet');

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'Pet not found');
    });

    it('POST /api/adoptions/:uid/:pid - 400 pet already adopted', async () => {
        usersService.getUserById = async (id) => ({ _id: 'u1', pets: [] });
        petsService.getBy = async (q) => ({ _id: 'p1', adopted: true });

        const res = await request(app).post('/api/adoptions/u1/p1');

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'Pet is already adopted');
    });

    it('POST /api/adoptions/:uid/:pid - adopta correctamente', async () => {
        const user = { _id: 'u2', pets: [] };
        const pet = { _id: 'p2', adopted: false };

        usersService.getUserById = async (id) => user;
        petsService.getBy = async (q) => pet;

        let updatedUser = null;
        usersService.update = async (id, body) => { updatedUser = { id, body }; return { _id: id, ...body }; };
        petsService.update = async (id, body) => ({ _id: id, ...body });
        adoptionsService.create = async (doc) => ({ _id: 'adopt1', ...doc });

        const res = await request(app).post('/api/adoptions/u2/p2');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Pet adopted');
        expect(updatedUser).to.not.equal(null);
    });
});
