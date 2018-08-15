const { User } = require('../models');

module.exports = {
  // O método index renderiza página principal
  // passando lista de usuários do banco
  async index(req, res) {
    const users = await User.findAll();
    res.render('index', { users });
  },
};
