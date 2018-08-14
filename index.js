const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();

nunjucks.configure(path.resolve('app', 'views'), {
  autoescape: true,
  express: app,
});

// Setando extensão das views pra não
// precisar definir nos métodos das rotas
app.set('view engine', 'njk');

// Entendendo dados recebidos na requisição (npm install + require)
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000);
