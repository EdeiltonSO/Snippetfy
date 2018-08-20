module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Sessions', {
      // SessionID
      sid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      // Expira em um dia, mas é possivel configurar no session.js
      expires: DataTypes.DATE,

      // Contém tudo que tem na req.session.user
      data: DataTypes.TEXT,
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
    queryInterface.dropTable('Sessions');
  },
};
