// require bycrypt
const bcrypt = require('bcryptjs');
// require user model
const User = require('../../models/user');
// function to compare userpassword against database password for a match
const comparePass = (userPassword, databasePassword) => {
  return bcrypt.compareSync(userPassword, databasePassword);
}
// function to redirect user to user page if correct?
const loginRedirect = (req, res, next) => {
  if (req.user) {
    return res.redirect('/user');
  }
  return next();
}
// function to redirect user to login page if not logged in
const loginRequired = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
}