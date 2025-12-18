const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../../../app');
const authService = require('../../../service/authService');

describe('Auth Controller', () => {
  it('Quando informo login correto recebo 200', async () => {
    const authServiceMock = sinon.stub(authService, 'login');

    authServiceMock.returns({
      username: 'coordenador',
      password: '1234',
    });

    const res = await request(app)
      .post('/login')
      .send({ username: 'coordenador', password: '1234' });
    expect(res.status).to.equal(200);
    
  
    authServiceMock.restore();
  });

  it('Quando informo login nulo recebo 400', async () => {
    const authServiceMock = sinon
      .stub(authService, 'login')
      .throws(new Error('Login e senha devem ser informados'));

    const res = await request(app)
      .post('/login')
      .send({ username: null, password: 'password' });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      'error',
      'Login e senha devem ser informados',
    );
    authServiceMock.restore();
  });

  it('Quando informo usuário inválido recebo 400', async () => {
    const authServiceMock = sinon
      .stub(authService, 'login')
      .throws(new Error('Usuário ou senha inválidos'));

    const res = await request(app)
      .post('/login')
      .send({ username: 'coordenador213', password: '123' });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Usuário ou senha inválidos');
    authServiceMock.restore();
  });

  it('Quando informo senha inválido recebo 400', async () => {
    const authServiceMock = sinon
      .stub(authService, 'login')
      .throws(new Error('Usuário ou senha inválidos'));

    const res = await request(app)
      .post('/login')
      .send({ username: 'coordenador', password: '159' });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Usuário ou senha inválidos');
    authServiceMock.restore();
  });
});
