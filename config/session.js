const session = require('express-session');

// A linha abaixo retorna uma função, logo,
// pode-se passar o session.Store como parâmetro,
// uma variável contida dentro do express-session
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Importando conexão com o banco de dados
// Se não especificar o arquivo, ele pega o index automaticamente
const { sequelize } = require('../app/models');

module.exports = {
  secret: 'snippetfy2018rocketseat',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

// O secret é uma chave única
// que identifica a session.
// Pode ser um hash ou algo
// obtido de outra forma,
// desde que seja único

// O saveUninitialized em false apenas criará
// a sessão se o usuário realmente fizer login.
// Se deixar true, ele vai criar registros de
// sessão no banco mesmo se o usuário
// apenas fizer TENTATIVAS de login
