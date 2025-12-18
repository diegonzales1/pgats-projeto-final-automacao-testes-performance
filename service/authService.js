const userRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');
const SECRET = 'supersecret';

module.exports = {
  login: (input, password) => {
    // Permite login({ username, password }) ou login(username, password)
    let usernameArg, passwordArg;
    if (typeof input === 'object' && input !== null) {
      usernameArg = input.username;
      passwordArg = input.password;
    } else {
      usernameArg = input;
      passwordArg = password;
    }
    if (!usernameArg || !passwordArg) throw new Error('Login e senha devem ser informados');
    const user = userRepository.getByUsername(usernameArg);
    if (!user || user.password !== passwordArg) throw new Error('Usuário ou senha inválidos');
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
    return { token };
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, SECRET);
    } catch (err) {
      throw new Error('Token inválido');
    }
  }
};
