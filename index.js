const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const sessionConfig = require('./config/session');

const routes = require('./app/routes');

const app = express();

app.use(express.static(path.resolve('app', 'public')));
app.use(session(sessionConfig));
app.use(flash());

nunjucks.configure(path.resolve('app', 'views'), {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(3000);
