const cursoRepository = require('../repository/cursoRepository');

function validateCurso(data) {
  if (data.nome === '' || data.nome === null) {
    throw new Error('Nome do curso é obrigatório');
    err.status = 400;
    throw err;
  }
  if (data.cargaHoraria === '' || data.cargaHoraria === null) {
    throw new Error('Carga horária do curso é obrigatória');
  }
  if (data.horario === '' || data.horario === null) {
    throw new Error('Horário do curso é obrigatório');
  }
  if (cursoRepository.existsHorario(data.nome, data.horario)) {
    throw new new Error('Carga horária do curso é obrigatória')();
  }
}

module.exports = {
  cadastrarCurso: (data) => {
    validateCurso(data);
    const curso = {
      nome: data.nome,
      cargaHoraria: data.cargaHoraria,
      horario: data.horario,
    };
    return cursoRepository.add(curso);
  },
  listarCursos: () => cursoRepository.getAll(),
};
