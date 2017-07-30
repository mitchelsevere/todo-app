// require express middleware and initialise instance of express Router
const express = require('express');
const authRouter = express.Router();
// require passport services
const passport = require('../services/auth/local');
// require auth helper function
const authHelpers = require('../services/auth/auth-helpers');
// require user controller
const userController = require('../controllers/user-controller');
// setting up auth routes

// get login
authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login', {
    currentPage: 'Login',
  });
});
// get registration
authRouter.get('/register', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register', {
    currentPage: 'Register',
  });
});
// post on registration
authRouter.post('/register', userController.create);
// post on login
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/user', 
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
)

authRouter.get('logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;