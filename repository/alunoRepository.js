const alunos = [];
let nextId = 1;

module.exports = {
  getAll: () => alunos.filter(a => a.ativo),
  getById: (id) => alunos.find(a => a.id === id),
  add: (aluno) => {
    aluno.id = nextId++;
    alunos.push(aluno);
    return aluno;
  },
  update: (id, data) => {
    const aluno = alunos.find(a => a.id === id);
    if (aluno) Object.assign(aluno, data);
    return aluno;
  },
  delete: (id) => {
    const aluno = alunos.find(a => a.id === id);
    if (aluno) aluno.ativo = false;
    return aluno;
  },
  exists: (id) => alunos.some(a => a.id === id && a.ativo)
};
