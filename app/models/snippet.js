module.exports = (sequelize, DataTypes) => {
  const Snippet = sequelize.define('Snippet', {
    // campos estrangeiros não ficam aqui
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  });

  // É preciso informar pro model que existe
  // uma associação dele com o model de usuário.
  // Isso é feito da forma abaixo:
  Snippet.associate = (models) => {
    Snippet.belongsTo(models.Category);
  };

  return Snippet;
};
