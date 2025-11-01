import express from 'express';
import request from 'supertest';
import { expect } from 'chai';

import adoptionsRouter from '../src/routes/adoption.router.js';
import { adoptionsService, petsService, usersService } from '../src/services/index.js';
import { globalErrorHandler, notFoundHandler } from '../src/utils/errorHandler.js';

describe('Adoptions API - Tests Completos', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/api/adoptions', adoptionsRouter);
        app.all('*', notFoundHandler);
        app.use(globalErrorHandler);
    });

    describe('GET /api/adoptions', () => {
        it('debe devolver lista vacía cuando no hay adopciones', async () => {
            adoptionsService.getAll = async () => [];

            const res = await request(app).get('/api/adoptions');

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status', 'success');
            expect(res.body.payload).to.be.an('array').with.length(0);
        });

        it('debe devolver lista con adopciones existentes', async () => {
            const fake = [
                { _id: 'a1', owner: 'u1', pet: 'p1' },
                { _id: 'a2', owner: 'u2', pet: 'p2' }
            ];
            adoptionsService.getAll = async () => fake;

            const res = await request(app).get('/api/adoptions');

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status', 'success');
            expect(res.body.payload).to.be.an('array').with.length(2);
            expect(res.body.payload[0]).to.have.property('_id', 'a1');
            expect(res.body.payload[1]).to.have.property('_id', 'a2');
        });

        it('debe manejar errores internos del servicio', async () => {
            adoptionsService.getAll = async () => {
                throw new Error('Database error');
            };

            const res = await request(app).get('/api/adoptions');

            expect(res.status).to.be.greaterThan(399);
        });
    });

    describe('GET /api/adoptions/:aid', () => {
        it('debe retornar 404 cuando la adopción no existe', async () => {
            adoptionsService.getBy = async (q) => null;

            const res = await request(app).get('/api/adoptions/nonexistent123');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('status', 'fail');
            expect(res.body).to.have.property('message', 'Adoption not found');
        });

        it('debe devolver adopción existente correctamente', async () => {
            const adoption = {
                _id: 'a2',
                owner: 'u2',
                pet: 'p2',
                createdAt: new Date().toISOString()
            };
            adoptionsService.getBy = async (q) => {
                expect(q).to.have.property('_id', 'a2');
                return adoption;
            };

            const res = await request(app).get('/api/adoptions/a2');

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status', 'success');
            expect(res.body.payload).to.deep.equal(adoption);
        });

        it('debe buscar por el ID correcto', async () => {
            let queriedId = null;
            adoptionsService.getBy = async (q) => {
                queriedId = q._id;
                return { _id: q._id, owner: 'test', pet: 'test' };
            };

            await request(app).get('/api/adoptions/specific123');

            expect(queriedId).to.equal('specific123');
        });
    });

    describe('POST /api/adoptions/:uid/:pid', () => {
        it('debe retornar 404 cuando el usuario no existe', async () => {
            usersService.getUserById = async (id) => null;

            const res = await request(app).post('/api/adoptions/nonuser/somepet');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('status', 'fail');
            expect(res.body).to.have.property('message', 'user Not found');
        });

        it('debe retornar 404 cuando la mascota no existe', async () => {
            usersService.getUserById = async (id) => ({
                _id: 'u1',
                pets: [],
                first_name: 'Test',
                last_name: 'User'
            });
            petsService.getBy = async (q) => null;

            const res = await request(app).post('/api/adoptions/u1/nopet');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('status', 'fail');
            expect(res.body).to.have.property('message', 'Pet not found');
        });

        it('debe retornar 400 cuando la mascota ya está adoptada', async () => {
            usersService.getUserById = async (id) => ({
                _id: 'u1',
                pets: [],
                first_name: 'Test'
            });
            petsService.getBy = async (q) => ({
                _id: 'p1',
                name: 'Firulais',
                adopted: true,
                owner: 'another_user'
            });

            const res = await request(app).post('/api/adoptions/u1/p1');

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('status', 'fail');
            expect(res.body).to.have.property('message', 'Pet is already adopted');
        });

        it('debe adoptar correctamente cuando todos los datos son válidos', async () => {
            const user = {
                _id: 'u2',
                pets: [],
                first_name: 'Juan',
                last_name: 'Pérez'
            };
            const pet = {
                _id: 'p2',
                name: 'Rex',
                specie: 'Dog',
                adopted: false
            };

            usersService.getUserById = async (id) => {
                expect(id).to.equal('u2');
                return user;
            };

            petsService.getBy = async (q) => {
                expect(q).to.have.property('_id', 'p2');
                return pet;
            };

            let userUpdated = false;
            let petUpdated = false;
            let adoptionCreated = false;

            usersService.update = async (id, body) => {
                expect(id).to.equal('u2');
                expect(body.pets).to.include('p2');
                userUpdated = true;
                return { _id: id, ...body };
            };

            petsService.update = async (id, body) => {
                expect(id).to.equal('p2');
                expect(body.adopted).to.be.true;
                expect(body.owner).to.equal('u2');
                petUpdated = true;
                return { _id: id, ...body };
            };

            adoptionsService.create = async (doc) => {
                expect(doc.owner).to.equal('u2');
                expect(doc.pet).to.equal('p2');
                adoptionCreated = true;
                return { _id: 'adopt1', ...doc };
            };

            const res = await request(app).post('/api/adoptions/u2/p2');

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status', 'success');
            expect(res.body).to.have.property('message', 'Pet adopted');
            expect(userUpdated).to.be.true;
            expect(petUpdated).to.be.true;
            expect(adoptionCreated).to.be.true;
        });

        it('debe agregar la mascota al array de pets del usuario', async () => {
            const user = {
                _id: 'u3',
                pets: ['existingPet1', 'existingPet2']
            };
            const pet = {
                _id: 'p3',
                adopted: false
            };

            usersService.getUserById = async (id) => user;
            petsService.getBy = async (q) => pet;

            let finalPets = null;
            usersService.update = async (id, body) => {
                finalPets = body.pets;
                return { _id: id, ...body };
            };

            petsService.update = async (id, body) => ({ _id: id, ...body });
            adoptionsService.create = async (doc) => ({ _id: 'adopt1', ...doc });

            await request(app).post('/api/adoptions/u3/p3');

            expect(finalPets).to.be.an('array').with.length(3);
            expect(finalPets).to.include('existingPet1');
            expect(finalPets).to.include('existingPet2');
            expect(finalPets).to.include('p3');
        });

        it('debe verificar que se llaman los servicios en el orden correcto', async () => {
            const callOrder = [];

            usersService.getUserById = async (id) => {
                callOrder.push('getUserById');
                return { _id: id, pets: [] };
            };

            petsService.getBy = async (q) => {
                callOrder.push('getPet');
                return { _id: q._id, adopted: false };
            };

            usersService.update = async (id, body) => {
                callOrder.push('updateUser');
                return { _id: id, ...body };
            };

            petsService.update = async (id, body) => {
                callOrder.push('updatePet');
                return { _id: id, ...body };
            };

            adoptionsService.create = async (doc) => {
                callOrder.push('createAdoption');
                return { _id: 'adopt1', ...doc };
            };

            await request(app).post('/api/adoptions/testUser/testPet');

            expect(callOrder).to.deep.equal([
                'getUserById',
                'getPet',
                'updateUser',
                'updatePet',
                'createAdoption'
            ]);
        });
    });
});
