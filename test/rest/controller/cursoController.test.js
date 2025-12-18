const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../../../app');
const cursoService = require('../../../service/cursoService');

describe('Curso Controller', () => {
  let token;

  beforeEach(async () => {
    const login = await request(app).post('/login').send({
      username: 'coordenador',
      password: '1234',
    });
    token = login.body.token;
  });

  it('Quando informo valores válidos eu recebo 201', async () => {
    const cursoServiceMock = sinon.stub(cursoService, 'cadastrarCurso');
    cursoServiceMock.returns({
      nome: 'Automação de Testes de API',
      cargaHorario: '2 meses',
      horario: 'Noite',
    });

    const res = await request(app)
      .post('/cursos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Automação de Testes de API',
        cargaHorario: '2 meses',
        horario: 'Noite',
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('nome', 'Automação de Testes de API');
    expect(res.body).to.have.property('cargaHorario', '2 meses');
    expect(res.body).to.have.property('horario', 'Noite');
    cursoServiceMock.restore();
  });

  it('Quando informo curso e horário já existente recebo 400', async () => {
    const cursoServiceMock = sinon
      .stub(cursoService, 'cadastrarCurso')
      .throws(new Error('Já existe um curso com esse nome e horário'));

    const res = await request(app)
      .post('/cursos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Automação de Testes de API',
        cargaHorario: '2 meses',
        horario: 'Noite',
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      'error',
      'Já existe um curso com esse nome e horário',
    );
    cursoServiceMock.restore();
  });

  it('Quando informo nome do curso nulo recebo 400', async () => {
    const cursoServiceMock = sinon
      .stub(cursoService, 'cadastrarCurso')
      .throws(new Error('Nome do curso é obrigatório'));

    const res = await request(app)
      .post('/cursos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: null,
        cargaHorario: '2 meses',
        horario: 'Noite',
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Nome do curso é obrigatório');
    cursoServiceMock.restore();
  });

  it('Quando informo a carga horária nula recebo 400', async () => {
    const cursoServiceMock = sinon
      .stub(cursoService, 'cadastrarCurso')
      .throws(new Error('Nome do curso é obrigatório'));

    const res = await request(app)
      .post('/cursos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Automação de Testes de API',
        cargaHorario: null,
        horario: 'Noite',
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Nome do curso é obrigatório');
    cursoServiceMock.restore();
  });

  it('Quando informo o horário nula recebo 400', async () => {
    const cursoServiceMock = sinon
      .stub(cursoService, 'cadastrarCurso')
      .throws(new Error('Nome do curso é obrigatório'));

    const res = await request(app)
      .post('/cursos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Automação de Testes de API',
        cargaHorario: '2 meses',
        horario: null,
      });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Nome do curso é obrigatório');
    cursoServiceMock.restore();
  });
});
