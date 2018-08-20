module.exports = (req, res, next) => {
  if (!req.session.user) {
    req.flash('error', 'Faça login para continuar');
    res.redirect('/');
  } else {
    next();
  }
};
