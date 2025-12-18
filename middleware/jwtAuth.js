const authService = require('../service/authService');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado' });
  }
  const token = authHeader.split(' ')[1];
  try {
    req.user = authService.verifyToken(token);
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
