import http from 'k6/http';
import { BASE_URL } from './baseURL.js';

/**
 * Realiza uma requisição POST para a API
 * 
 * @param {String} uri - endpoint da API
 * @param {Object} payload - corpo da requisição
 * @param {Object} headers - cabeçalhos adicionais da requisição
 * @example
 * post('/login', {username: 'coordenador', password: '1234'}, {'Custom-Header': 'value'})
 * @returns {Object} response - resposta da requisição
 */
export function post(uri, payload, headers = {}) {
  return (http.post(
    `${BASE_URL}${uri}`,
    JSON.stringify(payload),
    {
      headers: { 'Content-Type': 'application/json', ...headers },
    },
  ));
}
