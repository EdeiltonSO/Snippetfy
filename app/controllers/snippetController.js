const { Snippet, Category } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { categoryId } = req.params;
      const snippet = await Snippet.create({
        ...req.body,
        CategoryId: categoryId,
      });

      req.flash('success', 'Snippet criado com sucesso');

      return res.redirect(`/app/categories/${categoryId}/snippets/${snippet.id}`);
    } catch (error) {
      return next();
    }
  },

  async show(req, res, next) {
    try {
      const { categoryId, id } = req.params;

      // Pegando lista de categorias pra mostrar na página
      const categories = await Category.findAll({
        include: [Snippet],
        where: { UserId: req.session.user.id },
      });

      // Pegando lista de snippets da categoria pra mostrar na página
      const snippets = await Snippet.findAll({
        where: { CategoryId: categoryId },
      });

      // Pegando o snippet escolhido pra mostrar na página
      const snippet = await Snippet.findById(id);

      return res.render('snippets/show', {
        activeCategory: categoryId,
        categories,
        snippets,
        currentSnippet: snippet,
      });
    } catch (error) {
      return next(error);
    }
  },
  async update(req, res, next) {
    try {
      const snippet = await Snippet.findById(req.params.id);

      await snippet.update(req.body);

      req.flash('success', 'Snippet atualizado com sucesso');
      return res.redirect(`/app/categories/${req.params.categoryId}/snippets/${req.params.id}`);
    } catch (error) {
      return next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      await Snippet.destroy({ where: { id: req.params.id } });
      req.flash('success', 'Snippet excluído com sucesso');
      return res.redirect(`/app/categories/${req.params.categoryId}`);
    } catch (error) {
      return next(error);
    }
  },
};
