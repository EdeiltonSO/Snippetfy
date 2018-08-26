const { Category } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      // O create abaixo retorna o objeto que foi criado
      const category = await Category.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', 'Categoria criada com sucesso');

      // Aqui, o category.id utiliza uma propriedade do objeto criado
      return res.redirect(`/app/categories/${category.id}`);
    } catch (error) {
      return next();
    }
  },
};
