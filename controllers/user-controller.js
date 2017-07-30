// require bcrypt middleware
const bcrypt = require('bcryptjs');
// require User model
const User = require('../models/user');
// create empty controller object
const userController = {};
// user index page
userController.index = (req, res) => {
  res.json({
    user: req.user,
    data: 'Put a user profile on this route'
  });
}
// create new user on register page
userController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.add({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }).then(user => {
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/user');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

module.exports = userController;