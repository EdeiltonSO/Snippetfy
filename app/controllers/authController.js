const bcrypt = require('bcryptjs');

const { User } = require('../models');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },

  signup(req, res) {
    return res.render('auth/signup');
  },

  async register(req, res, next) {
    try {
      const { email } = req.body;

      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'E-mail já cadastrado!');
        return res.redirect('back');
      }

      const password = await bcrypt.hash(req.body.password, 5);

      await User.create({ ...req.body, password });
      req.flash('success', 'Usuário cadastrado com sucesso!');
      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },

  async authenticate(req, res, next) {
    try {
      // Pegando email e senha que vieram na requisição
      const { email, password } = req.body;

      // Buscando usuário com esse email na base de dados
      const user = await User.findOne({ where: { email } });

      // Verificando se encontrou um usuário
      if (!user) {
        req.flash('error', 'Usuário inexistente!');
        return res.redirect('/');
      }

      // Verificando se a senha tá correta
      if (!(await bcrypt.compare(password, user.password))) {
        req.flash('error', 'Senha incorreta!');
        return res.redirect('/');
      }

      // Se email e senha estão corretos,
      // Então salva a sessão do usuário
      // e faz o redirecionamento no callback
      req.session.user = user;
      return req.session.save(() => res.redirect('app/dashboard'));
    } catch (err) {
      return next(err);
    }
  },

  signout(req, res) {
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
