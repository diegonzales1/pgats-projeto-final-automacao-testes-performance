const authService = require('../service/authService');

module.exports = {
  login: (req, res) => {
    try {
      const { username, password } = req.body;
      const result = authService.login(username, password);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
