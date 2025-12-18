# API de Cadastro de Alunos

## Estrutura dos Testes de Performance com K6

Este projeto utiliza o K6 para automação de testes de performance, organizando scripts, helpers e dados em uma estrutura modular e reutilizável. A seguir, explicamos os principais conceitos aplicados nos testes, com exemplos reais do código.

### Estrutura de Pastas dos Testes K6

- `test/rest/external/k6/` — Scripts de teste K6
  - `cadastroDeAluno.test.js` — Teste de performance do cadastro de aluno
  - `login.test.js` — Teste de performance do login
  - `helpers/` — Funções utilitárias (helpers), geração de dados, chamadas de API, etc.
  - `data/` — Dados para testes data-driven

---

### Conceitos Utilizados

#### 1. Thresholds

Thresholds são metas de performance que determinam se o teste passou ou falhou. No exemplo abaixo, o threshold exige que 95% das requisições sejam respondidas em menos de 50ms e nenhuma ultrapasse 100ms:

```js
export const options = {
  thresholds: {
    http_req_duration: ['max<100', 'p(95)<50'],
  },
  // ...existing code...
};
```
Arquivo: `test/rest/external/k6/cadastroDeAluno.test.js`

---

#### 2. Checks

Checks são asserções para validar respostas das requisições. Exemplo:

```js
check(respostaLogin, {
  'Login deve retornar status 200': (res) => res.status === 200,
  'Login deve retornar token': (res) => res.json('token') !== '',
});
```
Arquivo: `test/rest/external/k6/cadastroDeAluno.test.js`

---

#### 3. Helpers

Helpers são funções utilitárias para reaproveitamento de lógica, como login e cadastro:

```js
import { efetuaLogin, cadastrarAluno } from './helpers/funcoes.js';
```
Arquivo: `test/rest/external/k6/cadastroDeAluno.test.js`

---

#### 4. Trends

Trends são métricas customizadas para monitorar tempos de resposta específicos:

```js
const postCadastroAlunoTrend = new Trend('post_cadastro_aluno_duration');
// ...
postCadastroAlunoTrend.add(respostaAluno.timings.duration);
```
Arquivo: `test/rest/external/k6/cadastroDeAluno.test.js`

---

#### 5. Faker

Utilizamos a biblioteca `k6/x/faker` para gerar dados aleatórios e realistas:

```js
import faker from 'k6/x/faker';

export function randomAluno() {
  return {
    nome: `${faker.person.firstName()} ${faker.person.lastName()}`,
    idade: faker.numbers.number(12, 62),
    telefone: `${faker.numbers.number(10, 99)}-${faker.numbers.number(100000000, 999999999)}`,
    endereco: `${faker.address.city()}, ${faker.address.streetNumber()}`,
  };
}
```
Arquivo: `test/rest/external/k6/helpers/randomData.js`

---

#### 6. Variável de Ambiente

A URL base da API pode ser configurada via variável de ambiente:

```js
export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
```
Arquivo: `test/rest/external/k6/helpers/baseURL.js`

---

#### 7. Stages

Stages definem a variação de carga ao longo do teste:

```js
stages: [
  { duration: '3s', target: 10 }, // Ramp up
  { duration: '15s', target: 10 }, // Average
  { duration: '2s', target: 100 }, // Spike
  { duration: '3s', target: 100 }, // Spike
  { duration: '5s', target: 10 }, // Average
  { duration: '5s', target: 0 }, // Ramp down
],
```
Arquivo: `test/rest/external/k6/cadastroDeAluno.test.js`

---

#### 8. Reaproveitamento de Resposta

O token de autenticação obtido no login é reaproveitado para o cadastro de aluno:

```js
let respostaLogin = efetuaLogin(user);
token = respostaLogin.json('token');
let respostaAluno = cadastrarAluno(token, aluno);
```
Arquivo: `test/rest/external/k6/cadastroDeAluno.test.js`

---

#### 9. Uso de Token de Autenticação

O token JWT é enviado no header Authorization:

```js
export function cadastrarAluno(token, aluno) {
  return post('/alunos', aluno, {
    Authorization: `Bearer ${token}`,
  });
}
```
Arquivo: `test/rest/external/k6/helpers/funcoes.js`

---

#### 10. Data-Driven Testing

Os dados de login são lidos de um arquivo JSON, permitindo testes com múltiplos usuários:

```js
const usuarios = new SharedArray('usuarios', function () {
  return JSON.parse(open('./data/login.test.data.json'));
});
const user = usuarios[(__VU - 1) % usuarios.length];
```
Arquivo: `test/rest/external/k6/cadastroDeAluno.test.js`

---

#### 11. Groups

Groups organizam o teste em blocos lógicos, facilitando a leitura e análise dos resultados:

```js
group('Efetua login como coordenador', () => {
  // ...login...
});
group('Cadastra um novo aluno', () => {
  // ...cadastro...
});
```
Arquivo: `test/rest/external/k6/cadastroDeAluno.test.js`

---

### Exemplo Integrado

O trecho abaixo demonstra o uso conjunto de vários conceitos:

```js
group('Efetua login como coordenador', () => {
  const user = usuarios[(__VU - 1) % usuarios.length];
  let respostaLogin = efetuaLogin(user);
  check(respostaLogin, {
    'Login deve retornar status 200': (res) => res.status === 200,
    'Login deve retornar token': (res) => res.json('token') !== '',
  });
  token = respostaLogin.json('token');
});
```
Arquivo: `test/rest/external/k6/cadastroDeAluno.test.js`

---

### Conclusão

A estrutura dos testes K6 neste projeto foi desenhada para ser modular, reutilizável e fácil de manter, aplicando boas práticas de automação de performance e cobrindo os principais conceitos da ferramenta.

## API GraphQL
Além da API REST, este projeto expõe os serviços de Aluno, Curso e Autenticação via GraphQL usando ApolloServer e Express.

### Como executar a API GraphQL
1. Acesse a pasta `graphql`:
  ```bash
  cd graphql
  ```
2. Instale as dependências (se ainda não instalou no projeto raiz):
  ```bash
  npm install
  ```
3. Para rodar o servidor GraphQL:
  ```bash
  node server.js
  ```
4. Para rodar apenas o app (para testes):
  ```bash
  node app.js
  ```

### Autenticação nas Mutations
Obtenha o JWT via login REST e envie no header `Authorization: Bearer <token>` nas Mutations protegidas.

### Documentação GraphQL
O endpoint GraphQL estará disponível em `/graphql` (porta 4000 por padrão).
Consulte o playground do ApolloServer para explorar o schema.


## Descrição
API REST para cadastro de alunos e cursos, com autenticação JWT e controle de permissões por roles (coordenador e diretor). Utiliza banco de dados em memória e documentação via Swagger.

## Instalação

1. Clone o repositório ou baixe os arquivos.
2. Instale as dependências:
   ```bash
   npm install
   ```

## Executando a API

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.


## Documentação Swagger
Acesse a documentação interativa REST em:
```
http://localhost:3000/api-docs
```
E a documentação GraphQL em:
```
http://localhost:4000/graphql
```

## Usuários de Teste
- **Coordenador:**
  - usuário: `coordenador`
  - senha: `1234`
- **Diretor:**
  - usuário: `diretor`
  - senha: `1234`

## Endpoints Principais

- `POST /login` — Autenticação e obtenção do token JWT
- `GET /alunos` — Listar alunos (autenticado)
- `POST /alunos` — Cadastrar aluno (coordenador/diretor)
- `DELETE /alunos/:id` — Exclusão lógica de aluno (diretor)
- `GET /cursos` — Listar cursos (autenticado)
- `POST /cursos` — Cadastrar curso (coordenador/diretor)

## Regras de Negócio
- Login e senha obrigatórios para autenticação
- Todos os campos de cadastro são obrigatórios
- Não pode cadastrar curso com mesmo nome e horário
- Exclusão lógica de aluno exige id existente

## Testes
Para rodar os testes (após implementar):
```bash
npm test
```

## Testes de Performance 
Para rodas os testes de performance:

```bash
k6 run "test\rest\external\k6\cadastroDeAluno.test.js"
```

# pgats-projeto-final-automacao-testes-performance
