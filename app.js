const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const jwtAuth = require('./middleware/jwtAuth');
const authMiddleware = require('./middleware/authMiddleware');
const alunoController = require('./controller/alunoController');
const cursoController = require('./controller/cursoController');
const authController = require('./controller/authController');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/login', authController.login);

app.get('/alunos', jwtAuth, alunoController.listarAlunos);
app.post('/alunos', jwtAuth, authMiddleware(['coordenador', 'diretor']), alunoController.cadastrarAluno);
app.delete('/alunos/:id', jwtAuth, authMiddleware(['diretor']), alunoController.excluirAluno);

app.get('/cursos', jwtAuth, cursoController.listarCursos);
app.post('/cursos', jwtAuth, authMiddleware(['coordenador', 'diretor']), cursoController.cadastrarCurso);

module.exports = app;
