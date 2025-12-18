const alunoService = require('../service/alunoService');

module.exports = {
  cadastrarAluno: (req, res) => {
    try {
      const aluno = alunoService.cadastrarAluno(req.body);
      res.status(201).json(aluno);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  excluirAluno: (req, res) => {
    try {
      const aluno = alunoService.excluirAluno(Number(req.params.id));
      res.json(aluno);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  listarAlunos: (req, res) => {
    res.json(alunoService.listarAlunos());
  }
};
