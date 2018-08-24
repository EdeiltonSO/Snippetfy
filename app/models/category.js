module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    // campos estrangeiros não ficam aqui
    title: DataTypes.STRING,
  });

  // É preciso informar pro model que existe
  // uma associação dele com o model de usuário.
  // Isso é feito da forma abaixo:
  Category.associate = (models) => {
    Category.belongsTo(models.User); // Categoria pertence a um usuário
    Category.hasMany(models.Snippet); // Uma categoria pode ter vários snippets
  };

  return Category;
};
