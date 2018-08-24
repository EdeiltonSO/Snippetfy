module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Snippets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        references: { model: 'Categories', key: 'id' },
        onUpdate: 'CASCADE', // Se o ID da categoria for atualizado, aqui também vai ser atualizado
        onDelete: 'CASCADE', // Se a categoria for deletada, os snippets vinculados serão apagados
        allowNull: false, // Não é possível criar snippet sem especificar ID da categoria
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('Snippets');
  },
};
