const request = require('supertest');

const { expect, use } = require('chai');

describe('Aluno Controller', () => {
  const URL = 'http://localhost:3000';
  const URI = '/alunos';

  let TOKEN;

  describe('Validações com a rule de coordenador', () => {
    beforeEach(async () => {
      await request(URL).post('/__reset__');
      const login = await request(URL).post('/login').send({
        username: 'coordenador',
        password: '1234',
      });
      TOKEN = login.body.token;
    });

    it('Quando informo valores válidos eu recebo 201', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: '99-999999999',
          endereco: 'Rua dos qas, 10',
        });
      
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('nome', 'Diego');
      expect(res.body).to.have.property('idade', 29);
      expect(res.body).to.have.property('telefone', '99-999999999');
      expect(res.body).to.have.property('endereco', 'Rua dos qas, 10');
    });

    it('Quando informo nome do aluno nulo recebo 400', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          nome: null,
          idade: 29,
          telefone: '99-999999999',
          endereco: 'Rua dos qas, 10',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Nome do aluno é obrigatório');
    });

    it('Quando informo a idade nula recebo 400', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          nome: 'Diego',
          idade: null,
          telefone: '99-999999999',
          endereco: 'Rua dos qas, 10',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Idade do aluno é obrigatória',
      );
    });

    it('Quando informo o telefone null recebo 400', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
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
    });

    it('Quando informo o endereço null recebo 400', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: '99-999999999',
          endereco: null,
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Endereço do aluno é obrigatório',
      );
    });

    it('Quando informo o telefone do aluno sem ddd recebo 400', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: '999',
          endereco: 'Rua dos qas, 10',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Telefone do aluno deve conter o DDD + o número. E deve estar no formato XX-XXXXXXXXX',
      );
    });
  });

  describe('Validações com a rule de diretor', () => {
    beforeEach(async () => {
      await request(URL).post('/__reset__');
      const login = await request(URL).post('/login').send({
        username: 'diretor',
        password: '1234',
      });
      TOKEN = login.body.token;
    });

    it('Quando informo valores válidos eu recebo 201', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: '99-999999999',
          endereco: 'Rua dos qas, 10',
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('nome', 'Diego');
      expect(res.body).to.have.property('idade', 29);
      expect(res.body).to.have.property('telefone', '99-999999999');
      expect(res.body).to.have.property('endereco', 'Rua dos qas, 10');
    });

    it('Quando informo nome do aluno nulo recebo 400', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          nome: null,
          idade: 29,
          telefone: '99-999999999',
          endereco: 'Rua dos qas, 10',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Nome do aluno é obrigatório');
    });

    it('Quando informo a idade nula recebo 400', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          nome: 'Diego',
          idade: null,
          telefone: '99-999999999',
          endereco: 'Rua dos qas, 10',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Idade do aluno é obrigatória',
      );
    });

    it('Quando informo o telefone null recebo 400', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
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
    });

    it('Quando informo o endereço null recebo 400', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: '99-999999999',
          endereco: null,
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Endereço do aluno é obrigatório',
      );
    });

    it('Quando informo o telefone do aluno sem ddd recebo 400', async () => {
      const res = await request(URL)
        .post(URI)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: '999999999',
          endereco: 'Rua dos qas, 10',
        });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Telefone do aluno deve conter o DDD + o número. E deve estar no formato XX-XXXXXXXXX',
      );
    });

    it('Quando informo passo o id inválido do aluno para exclusao recebo 400', async () => {
      const res = await request(URL)
        .delete(`${URI}/999`)
        .set('Authorization', `Bearer ${TOKEN}`);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Aluno não encontrado');
    });

    it('Quando informo passo o id válido do aluno para exclusao recebo 200', async () => {
      const novoAluno = await request(URL)
        .post('/alunos')
        .send({
          nome: 'Diego',
          idade: 29,
          telefone: '99-999999999',
          endereco: 'Rua dos qas, 10',
        })
        .set('Authorization', `Bearer ${TOKEN}`);

      const idAluno = novoAluno.body.id;

      const res = await request(URL)
        .delete(`${URI}/${idAluno}`)
        .set('Authorization', `Bearer ${TOKEN}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('nome', 'Diego');
      expect(res.body).to.have.property('idade', 29);
      expect(res.body).to.have.property('telefone', '99-999999999');
      expect(res.body).to.have.property('endereco', 'Rua dos qas, 10');
      expect(res.body).to.have.property('ativo', false);
      expect(res.body).to.have.property('id', idAluno);
    });
  });
});
