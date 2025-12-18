import { sleep, check, group } from 'k6';

import { efetuaLogin } from './helpers/funcoes.js';
import { SharedArray } from 'k6/data'; 

const usuarios = new SharedArray('usuarios', function () {
  return JSON.parse(open('./data/login.test.data.json'));
});

export const options = {
  vus: 10,
    thresholds: {
    http_req_duration: ['max<100', 'p(95)<50'],
  },
    stages: [
    { duration: '3s', target: 10 }, // Ramp up
    { duration: '15s', target: 10 }, // Average
    { duration: '2s', target: 100 }, // Spike
    { duration: '3s', target: 100 }, // Spike
    { duration: '5s', target: 10 }, // Average
    { duration: '5s', target: 0 }, // Ramp down
  ],
};

export default function () {
  group('Efetua login', () => {
    const user = usuarios[(__VU - 1) % usuarios.length];

    let respostaLogin = efetuaLogin(user);

    check(respostaLogin, {
      'Login deve retornar status 200': (res) => res.status === 200,
      'Login deve retornar token': (res) => res.json('token') !== '',
    });
  });

  sleep(1);
}
