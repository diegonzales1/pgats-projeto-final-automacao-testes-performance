import { post } from './chamadasApi.js';

/**
 *
 * @param {Object} user - objeto com username e password
 * @example
 * efetuaLogin({username: 'coordenador', password: '1234'})
 * @returns {Object} response - resposta da requisição
 */
export function efetuaLogin(user) {
  return post('/login', user);
}

/**
 *
 * @param {String} token - token de autenticação
 * @param {Object} aluno - objeto com dados do aluno
 * @example
 * cadastrarAluno(token, {nome: 'Diego', idade: 29, telefone: '99-999999999', endereco: 'Rua dos qas, 10'})
 * @returns {Object} response - resposta da requisição
 */
export function cadastrarAluno(token, aluno) {
  return post('/alunos', aluno, {
    Authorization: `Bearer ${token}`,
  });
}
