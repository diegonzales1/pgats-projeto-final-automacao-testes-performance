import { sleep, check, group } from 'k6';
import { Trend } from 'k6/metrics';
import { SharedArray } from 'k6/data';

import { efetuaLogin, cadastrarAluno } from './helpers/funcoes.js';
import { randomAluno } from './helpers/randomData.js';

/**
 * Teste de performance para cadastro de aluno
 * Teste inclui:
 * - Efetuar login como coordenador
 * - Cadastrar um novo aluno
 *
 * Validações incluem:
 * - Duração máxima de 500ms para todas as requisições
 * - 95% das requisições abaixo de 50ms
 *
 */

const postCadastroAlunoTrend = new Trend('post_cadastro_aluno_duration');

const usuarios = new SharedArray('usuarios', function () {
  return JSON.parse(open('./data/login.test.data.json'));
});

export const options = {
  vus: 20,
  // duration: '15s',
  thresholds: {
    http_req_duration: ['max<100', 'p(95)<50'],
  },
  stages: [
    { duration: '3s', target: 10 }, // Ramp up
    { duration: '15s', target: 10 }, // Average
    { duration: '2s', target: 100 }, // Spike
    { duration: '3s', target: 100 }, // Spike
    { duration: '5s', target: 10 }, // Average
    { duration: '5s', target: 0 }, // Ramp up
  ],
};

export default function () {
  let token = null;

  group('Efetua login como coordenador', () => {
    const user = usuarios[(__VU - 1) % usuarios.length];

    let respostaLogin = efetuaLogin(user);

    check(respostaLogin, {
      'Login deve retornar status 200': (res) => res.status === 200,
      'Login deve retornar token': (res) => res.json('token') !== '',
    });

    token = respostaLogin.json('token');
  });

  group('Cadastra um novo aluno', () => {
    const aluno = randomAluno();

    let respostaAluno = cadastrarAluno(token, aluno);

    check(respostaAluno, {
      'Cadastro de aluno deve retornar status 201': (res) => res.status === 201,
      'Cadastro de aluno deve retornar um id para o aluno cadastrado': (res) =>
        !!res.json('id'),
    });
    postCadastroAlunoTrend.add(respostaAluno.timings.duration);
  });

  sleep(1);
}
