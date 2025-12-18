const alunoService = require('../service/alunoService');
const cursoService = require('../service/cursoService');
const authService = require('../service/authService');

const resolvers = {
  Query: {
    alunos: () => alunoService.listarAlunos(),
    cursos: () => cursoService.listarCursos(),
    login: async (_, { username, password }) => {
      try {
        return await authService.login({ username, password });
      } catch (err) {
        throw new Error(err.message || 'Erro no login');
      }
    },
  },
  Mutation: {
    cadastrarAluno: async (_, args, context) => {
      if (!context.user) throw new Error('Autenticação obrigatória');
      try {
        return await alunoService.cadastrarAluno(args);
      } catch (err) {
        throw new Error(err.message || 'Erro ao cadastrar aluno');
      }
    },
    excluirAluno: async (_, { id }, context) => {
      if (!context.user) throw new Error('Autenticação obrigatória');
      try {
        return await alunoService.excluirAluno(id);
      } catch (err) {
        throw new Error(err.message || 'Erro ao excluir aluno');
      }
    },
    cadastrarCurso: async (_, args, context) => {
      if (!context.user) throw new Error('Autenticação obrigatória');
      try {
        return await cursoService.cadastrarCurso(args);
      } catch (err) {
        throw new Error(err.message || 'Erro ao cadastrar curso');
      }
    },
  },
};

module.exports = resolvers;
