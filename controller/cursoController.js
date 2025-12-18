const cursoService = require('../service/cursoService');

module.exports = {
  cadastrarCurso: (req, res) => {
    try {
      const curso = cursoService.cadastrarCurso(req.body);
      res.status(201).json(curso);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
  listarCursos: (req, res) => {
    res.json(cursoService.listarCursos());
  },
};
