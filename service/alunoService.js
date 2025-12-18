const alunoRepository = require('../repository/alunoRepository');

function validateAluno(data) {
  if (data.nome === '' || data.nome === null) {
    throw new Error('Nome do aluno é obrigatório');
  }
  if (data.idade === '' || data.idade === null) {
    throw new Error('Idade do aluno é obrigatória');
  }
  if (data.telefone === '' || data.telefone === null) {
    throw new Error('Telefone do aluno é obrigatório');
  }
  if (data.endereco === '' || data.endereco === null) {
    throw new Error('Endereço do aluno é obrigatório');
  }
  if (data.telefone.length < 11 || !/^\d{2}-\d{9}$/.test(data.telefone)) {
    throw new Error(
      'Telefone do aluno deve conter o DDD + o número. E deve estar no formato XX-XXXXXXXXX',
    );
  }
}

module.exports = {
  cadastrarAluno: (data) => {
    validateAluno(data);
    const aluno = {
      nome: data.nome,
      idade: data.idade,
      telefone: data.telefone,
      endereco: data.endereco,
      ativo: true,
    };
    return alunoRepository.add(aluno);
  },
  excluirAluno: (id) => {
    if (!id) throw new Error('Id do aluno é obrigatório');
    if (!alunoRepository.exists(id)) throw new Error('Aluno não encontrado');
    return alunoRepository.delete(id);
  },
  listarAlunos: () => alunoRepository.getAll(),
};
