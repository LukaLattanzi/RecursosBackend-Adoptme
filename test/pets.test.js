import express from 'express';
import request from 'supertest';
import { expect } from 'chai';

import petsRouter from '../src/routes/pets.router.js';
import { petsService } from '../src/services/index.js';
import { globalErrorHandler, notFoundHandler } from '../src/utils/errorHandler.js';

describe('Pets API', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/api/pets', petsRouter);
        app.all('*', notFoundHandler);
        app.use(globalErrorHandler);
    });

    it('GET /api/pets - devuelve lista', async () => {
        const fake = [{ _id: 'p1', name: 'Firulais', specie: 'dog' }];
        petsService.getAll = async () => fake;

        const res = await request(app).get('/api/pets');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body.payload).to.be.an('array').with.length(1);
        expect(res.body.payload[0]).to.include({ name: 'Firulais' });
    });

    it('POST /api/pets - 400 si faltan campos', async () => {
        const res = await request(app).post('/api/pets').send({ name: 'SoloNombre' });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status', 'error');
        expect(res.body).to.have.property('error', 'Incomplete values');
    });

    it('POST /api/pets - crea mascota correctamente', async () => {
        const input = { name: 'Michi', specie: 'cat', birthDate: '2018-01-01' };
        const created = { _id: 'new1', ...input };
        petsService.create = async (p) => created;

        const res = await request(app).post('/api/pets').send(input);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body.payload).to.include({ name: 'Michi', specie: 'cat' });
    });

    it('PUT /api/pets/:pid - actualiza correctamente', async () => {
        petsService.update = async (id, body) => ({ _id: id, ...body });

        const res = await request(app).put('/api/pets/p123').send({ name: 'NuevoNombre' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'pet updated');
    });

    it('DELETE /api/pets/:pid - elimina correctamente', async () => {
        petsService.delete = async (id) => ({ deleted: true });

        const res = await request(app).delete('/api/pets/p123');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'pet deleted');
    });
});
