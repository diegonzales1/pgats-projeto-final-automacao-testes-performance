const jwt = require('jsonwebtoken');

function authenticate(token) {
  if (!token) return null;
  try {
    return jwt.verify(token.replace('Bearer ', ''), 'seu_segredo_jwt');
  } catch (err) {
    console.warn('JWT inválido:', err.message);
    return null;
  }
}

module.exports = { authenticate };
