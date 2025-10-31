import express from 'express';
import request from 'supertest';
import { expect } from 'chai';

import usersRouter from '../src/routes/users.router.js';
import { usersService } from '../src/services/index.js';
import { globalErrorHandler, notFoundHandler } from '../src/utils/errorHandler.js';

describe('Users API', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/api/users', usersRouter);
        app.all('*', notFoundHandler);
        app.use(globalErrorHandler);
    });

    afterEach(() => {
    });

    it('GET /api/users - devuelve lista vacía correctamente', async () => {
        usersService.getAll = async () => [];

        const res = await request(app).get('/api/users');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('results', 0);
        expect(res.body).to.have.property('payload').that.is.an('array').with.length(0);
    });

    it('GET /api/users - devuelve usuarios cuando existen', async () => {
        const fake = [{ _id: '1', email: 'a@a.com', first_name: 'A', last_name: 'B' }];
        usersService.getAll = async () => fake;

        const res = await request(app).get('/api/users');

        expect(res.status).to.equal(200);
        expect(res.body.results).to.equal(1);
        expect(res.body.payload[0]).to.include({ email: 'a@a.com' });
    });

    it('GET /api/users/:uid - devuelve 404 cuando no existe', async () => {
        usersService.getUserById = async (id) => null;

        const res = await request(app).get('/api/users/unknown-id');

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Usuario no encontrado');
    });

    it('GET /api/users/:uid - devuelve usuario cuando existe', async () => {
        const user = { _id: 'u1', email: 'u1@x.com', first_name: 'U' };
        usersService.getUserById = async (id) => user;

        const res = await request(app).get('/api/users/u1');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('payload').that.deep.equals(user);
    });

    it('PUT /api/users/:uid - 404 si no existe', async () => {
        usersService.getUserById = async () => null;

        const res = await request(app).put('/api/users/nonexistent').send({ first_name: 'X' });

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Usuario no encontrado');
    });

    it('PUT /api/users/:uid - actualiza correctamente', async () => {
        const exist = { _id: 'u2', email: 'u2@x.com' };
        usersService.getUserById = async () => exist;
        usersService.update = async (id, body) => ({ ...exist, ...body });

        const res = await request(app).put('/api/users/u2').send({ first_name: 'Nuevo' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Usuario actualizado exitosamente');
    });

    it('DELETE /api/users/:uid - 404 si no existe', async () => {
        usersService.getUserById = async () => null;

        const res = await request(app).delete('/api/users/unknown');

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Usuario no encontrado');
    });

    it('DELETE /api/users/:uid - elimina correctamente', async () => {
        usersService.getUserById = async () => ({ _id: 'toDelete' });
        usersService.delete = async (id) => ({ deleted: true });

        const res = await request(app).delete('/api/users/toDelete');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Usuario eliminado exitosamente');
    });
});
