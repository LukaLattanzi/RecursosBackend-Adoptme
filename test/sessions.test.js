import express from 'express';
import request from 'supertest';
import { expect } from 'chai';

import sessionsRouter from '../src/routes/sessions.router.js';
import { usersService } from '../src/services/index.js';
import { createHash } from '../src/utils/index.js';
import { globalErrorHandler, notFoundHandler } from '../src/utils/errorHandler.js';

describe('Sessions API', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/sessions', sessionsRouter);
    app.all('*', notFoundHandler);
    app.use(globalErrorHandler);
  });

  it('POST /api/sessions/register - registra usuario nuevo correctamente', async () => {
    usersService.getUserByEmail = async (email) => null;
    usersService.create = async (user) => ({ _id: 'newuser', ...user });

    const res = await request(app).post('/api/sessions/register').send({
      first_name: 'Test',
      last_name: 'User',
      email: 'test@user.com',
      password: 'coder123'
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('payload');
  });

  it('POST /api/sessions/login - login exitoso y actualiza last_connection', async () => {
    const plain = 'coder123';
    const hashed = await createHash(plain);
    const user = { _id: 'u1', email: 'u1@x.com', password: hashed };

    usersService.getUserByEmail = async (email) => user;

    let updated = null;
    usersService.update = async (id, body) => {
      updated = { id, body };
      return { _id: id, ...body };
    };

    const res = await request(app).post('/api/sessions/login').send({ email: 'u1@x.com', password: plain });

    expect(res.status).to.equal(200);
    expect(res.headers['set-cookie']).to.exist;
    expect(updated).to.not.equal(null);
    expect(updated.id).to.equal('u1');
    expect(updated.body).to.have.property('last_connection');
  });

});
