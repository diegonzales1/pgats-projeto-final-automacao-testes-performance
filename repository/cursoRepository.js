const cursos = [];
let nextId = 1;

module.exports = {
  getAll: () => cursos,
  getById: (id) => cursos.find(c => c.id === id),
  add: (curso) => {
    curso.id = nextId++;
    cursos.push(curso);
    return curso;
  },
  existsHorario: (nome, horario) => cursos.some(c => c.nome === nome && c.horario === horario)
};
