// require express middleware and initialize instance of express Router
const express = require('express');
const userRouter = express.Router();
// require user controller
const userController = require('../controllers/user-controller');
// require auth helper function
const authHelpers = require('../services/auth/auth-helpers');

// get user page
userRouter.get('/', authHelpers.loginRequired, userController.index);

// export userRouter
module.exports = userRouter;