const { Category, Snippet } = require('../models');

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

  async show(req, res, next) {
    try {
      const categories = await Category.findAll({
        include: [Snippet],
        where: { UserID: req.session.user.id },
      });

      const snippets = await Snippet.findAll({
        where: { CategoryId: req.params.id },
      });

      return res.render('categories/show', {
        categories,
        snippets,
        activeCategory: req.params.id,
      });
    } catch (error) {
      return next(error);
    }
  },
};
