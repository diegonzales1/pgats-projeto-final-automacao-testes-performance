const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../../../app');
const alunoService = require('../../../service/alunoService');

describe('Aluno Controller', () => {
  let token;

  describe('Validações com a rule de coordenador', () => {
    beforeEach(async () => {
      const login = await request(app).post('/login').send({
        username: 'coordenador',
        password: '1234',
      });
      token = login.body.token;
    });

    it('Quando informo valores válidos eu recebo 201', async () => {
      const cursoServiceMock = sinon.stub(alunoService, 'cadastrarAluno');
      cursoServiceMock.returns({
        nome: 'Diego',
        idade: 29,
        telefone: 99999999999,
        endereco: 'Rua dos qas, 10',
      });

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: 99999999999,
          endereco: 'Rua dos qas, 10',
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('nome', 'Diego');
      expect(res.body).to.have.property('idade', 29);
      expect(res.body).to.have.property('telefone', 99999999999);
      expect(res.body).to.have.property('endereco', 'Rua dos qas, 10');
      cursoServiceMock.restore();
    });

    it('Quando informo nome do aluno nulo recebo 400', async () => {
      const cursoServiceMock = sinon
        .stub(alunoService, 'cadastrarAluno')
        .throws(new Error('Nome do aluno é obrigatório'));

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: null,
          idade: 29,
          telefone: 99999999999,
          endereco: 'Rua dos qas, 10',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Nome do aluno é obrigatório');
      cursoServiceMock.restore();
    });

    it('Quando informo a idade nula recebo 400', async () => {
      const cursoServiceMock = sinon
        .stub(alunoService, 'cadastrarAluno')
        .throws(new Error('Idade do aluno é obrigatória'));

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Diego',
          idade: null,
          telefone: 99999999999,
          endereco: 'Rua dos qas, 10',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Idade do aluno é obrigatória',
      );
      cursoServiceMock.restore();
    });

    it('Quando informo o telefone null recebo 400', async () => {
      const cursoServiceMock = sinon
        .stub(alunoService, 'cadastrarAluno')
        .throws(new Error('Telefone do aluno é obrigatório'));

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: null,
          endereco: 'Rua dos qas, 10',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Telefone do aluno é obrigatório',
      );
      cursoServiceMock.restore();
    });

    it('Quando informo o endereço null recebo 400', async () => {
      const cursoServiceMock = sinon
        .stub(alunoService, 'cadastrarAluno')
        .throws(new Error('Endereço do aluno é obrigatório'));

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: 99999999999,
          endereco: null,
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Endereço do aluno é obrigatório',
      );
      cursoServiceMock.restore();
    });

    it('Quando informo o telefone do aluno sem ddd recebo 400', async () => {
      const cursoServiceMock = sinon
        .stub(alunoService, 'cadastrarAluno')
        .throws(new Error('Telefone do aluno deve conter o DDD'));

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: 999999999,
          endereco: null,
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Telefone do aluno deve conter o DDD',
      );
      cursoServiceMock.restore();
    });
  });

  describe('Validações com a rule de diretor', () => {
    beforeEach(async () => {
      const login = await request(app).post('/login').send({
        username: 'diretor',
        password: '1234',
      });
      token = login.body.token;
    });

    it('Quando informo valores válidos eu recebo 201', async () => {
      const cursoServiceMock = sinon.stub(alunoService, 'cadastrarAluno');
      cursoServiceMock.returns({
        nome: 'Diego',
        idade: 29,
        telefone: 99999999999,
        endereco: 'Rua dos qas, 10',
      });

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: 99999999999,
          endereco: 'Rua dos qas, 10',
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('nome', 'Diego');
      expect(res.body).to.have.property('idade', 29);
      expect(res.body).to.have.property('telefone', 99999999999);
      expect(res.body).to.have.property('endereco', 'Rua dos qas, 10');
      cursoServiceMock.restore();
    });

    it('Quando informo nome do aluno nulo recebo 400', async () => {
      const cursoServiceMock = sinon
        .stub(alunoService, 'cadastrarAluno')
        .throws(new Error('Nome do aluno é obrigatório'));

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: null,
          idade: 29,
          telefone: 99999999999,
          endereco: 'Rua dos qas, 10',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Nome do aluno é obrigatório');
      cursoServiceMock.restore();
    });

    it('Quando informo a idade nula recebo 400', async () => {
      const cursoServiceMock = sinon
        .stub(alunoService, 'cadastrarAluno')
        .throws(new Error('Idade do aluno é obrigatória'));

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Diego',
          idade: null,
          telefone: 99999999999,
          endereco: 'Rua dos qas, 10',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Idade do aluno é obrigatória',
      );
      cursoServiceMock.restore();
    });

    it('Quando informo o telefone null recebo 400', async () => {
      const cursoServiceMock = sinon
        .stub(alunoService, 'cadastrarAluno')
        .throws(new Error('Telefone do aluno é obrigatório'));

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: null,
          endereco: 'Rua dos qas, 10',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Telefone do aluno é obrigatório',
      );
      cursoServiceMock.restore();
    });

    it('Quando informo o endereço null recebo 400', async () => {
      const cursoServiceMock = sinon
        .stub(alunoService, 'cadastrarAluno')
        .throws(new Error('Endereço do aluno é obrigatório'));

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: 99999999999,
          endereco: null,
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Endereço do aluno é obrigatório',
      );
      cursoServiceMock.restore();
    });

    it('Quando informo o telefone do aluno sem ddd recebo 400', async () => {
      const cursoServiceMock = sinon
        .stub(alunoService, 'cadastrarAluno')
        .throws(new Error('Telefone do aluno deve conter o DDD'));

      const res = await request(app)
        .post('/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: 999999999,
          endereco: null,
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Telefone do aluno deve conter o DDD',
      );
      cursoServiceMock.restore();
    });

    it('Quando informo passo o id inválido do aluno para exclusao recebo 400', async () => {
      const cursoServiceMock = sinon
        .stub(alunoService, 'cadastrarAluno')
        .throws(new Error('Aluno não encontrado'));

      const res = await request(app)
        .delete(`/alunos/12356`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Aluno não encontrado');
      cursoServiceMock.restore();
    });

    it('Quando informo passo o id válido do aluno para exclusao recebo 200', async () => {
       const cursoServiceMock = sinon.stub(alunoService, 'excluirAluno');
      cursoServiceMock.returns({
        nome: 'Diego',
        idade: 29,
        telefone: 99999999999,
        endereco: 'Rua dos qas, 10',
        ativo: false,
        id: 15
      });

      const res = await request(app)
        .delete('/alunos/15')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('nome', 'Diego');
      expect(res.body).to.have.property('idade', 29);
      expect(res.body).to.have.property('telefone', 99999999999);
      expect(res.body).to.have.property('endereco', 'Rua dos qas, 10');
      expect(res.body).to.have.property('ativo', false);
      expect(res.body).to.have.property('id', 15);
      cursoServiceMock.restore();
    });
  });
});
