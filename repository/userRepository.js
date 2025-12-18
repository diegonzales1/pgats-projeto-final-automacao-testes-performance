const users = [
  { id: 1, username: 'coordenador', password: '1234', role: 'coordenador' },
  {
    id: 2,
    username: 'coordenadorIngles',
    password: 'ingles1234',
    role: 'coordenador',
  },
  { id: 3, username: 'diretor', password: '1234', role: 'diretor' },
];

module.exports = {
  getByUsername: (username) => users.find((u) => u.username === username),
  getById: (id) => users.find((u) => u.id === id),
};
