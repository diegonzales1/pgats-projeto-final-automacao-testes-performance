const request = require('supertest');
const { expect } = require('chai');

describe('Aluno GraphQL', () => {
  const URL = 'http://localhost:4000/graphql';
  let TOKEN;

  const cadastrarAlunoMutation = `
    mutation CadastrarAluno($nome: String!, $idade: Int!, $telefone: String!, $endereco: String!) {
      cadastrarAluno(nome: $nome, idade: $idade, telefone: $telefone, endereco: $endereco) {
        nome
        idade
        telefone
        endereco
        id
        ativo
      }
    }
  `;

  const excluirAlunoMutation = `
    mutation ExcluirAluno($id: ID!) {
      excluirAluno(id: $id) {
        nome
        idade
        telefone
        endereco
        id
        ativo
      }
    }
  `;

  const loginQuery = `
    query Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
      }
    }
  `;

  async function getToken(username, password = '1234') {
    const res = await request(URL).post('').send({
      query: loginQuery,
      variables: { username, password },
    });
    if (res.body.errors) {
      throw new Error(res.body.errors[0].message);
    }
    if (!res.body.data || !res.body.data.login || !res.body.data.login.token) {
      throw new Error('Token não retornado pelo login');
    }
    return res.body.data.login.token;
  }

  describe('Validações com a rule de coordenador', () => {
    beforeEach(async () => {
      TOKEN = await getToken('coordenador');
    });

    it('Quando informo nome do aluno nulo recebo erro do GraphQL', async () => {
      const res = await request(URL)
        .post('')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          query: cadastrarAlunoMutation,
          variables: {
            nome: null,
            idade: 29,
            telefone: '99-999999999',
            endereco: 'Rua dos qas, 10',
          },
        });
      expect(res.body.errors[0].message).to.include('Variable "$nome"');
    });

    it('Quando informo a idade nula recebo erro do GraphQL', async () => {
      const res = await request(URL)
        .post('')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          query: cadastrarAlunoMutation,
          variables: {
            nome: 'Diego',
            idade: null,
            telefone: '99-999999999',
            endereco: 'Rua dos qas, 10',
          },
        });
      expect(res.body.errors[0].message).to.include('Variable "$idade"');
    });

    it('Quando informo o telefone nulo recebo erro do GraphQL', async () => {
      const res = await request(URL)
        .post('')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          query: cadastrarAlunoMutation,
          variables: {
            nome: 'Diego',
            idade: 29,
            telefone: null,
            endereco: 'Rua dos qas, 10',
          },
        });
      expect(res.body.errors[0].message).to.include('Variable "$telefone"');
    });

    it('Quando informo o endereço nulo recebo erro do GraphQL', async () => {
      const res = await request(URL)
        .post('')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          query: cadastrarAlunoMutation,
          variables: {
            nome: 'Diego',
            idade: 29,
            telefone: '99-999999999',
            endereco: null,
          },
        });
      expect(res.body.errors[0].message).to.include('Variable "$endereco"');
    });
  });

  describe('Validações com a rule de diretor', () => {
    beforeEach(async () => {
      TOKEN = await getToken('diretor');
    });

    it('Quando informo nome do aluno nulo recebo erro do GraphQL', async () => {
      const res = await request(URL)
        .post('')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          query: cadastrarAlunoMutation,
          variables: {
            nome: null,
            idade: 29,
            telefone: '99-999999999',
            endereco: 'Rua dos qas, 10',
          },
        });
      expect(res.body.errors[0].message).to.include('Variable "$nome"');
    });

    it('Quando informo a idade nula recebo erro do GraphQL', async () => {
      const res = await request(URL)
        .post('')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          query: cadastrarAlunoMutation,
          variables: {
            nome: 'Diego',
            idade: null,
            telefone: '99-999999999',
            endereco: 'Rua dos qas, 10',
          },
        });
      expect(res.body.errors[0].message).to.include('Variable "$idade"');
    });

    it('Quando informo o telefone nulo recebo erro do GraphQL', async () => {
      const res = await request(URL)
        .post('')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          query: cadastrarAlunoMutation,
          variables: {
            nome: 'Diego',
            idade: 29,
            telefone: null,
            endereco: 'Rua dos qas, 10',
          },
        });
      expect(res.body.errors[0].message).to.include('Variable "$telefone"');
    });

    it('Quando informo o endereço nulo recebo erro do GraphQL', async () => {
      const res = await request(URL)
        .post('')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({
          query: cadastrarAlunoMutation,
          variables: {
            nome: 'Diego',
            idade: 29,
            telefone: '99-999999999',
            endereco: null,
          },
        });
      expect(res.body.errors[0].message).to.include('Variable "$endereco"');
    });
  });
});
