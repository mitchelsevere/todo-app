// require express and initialise instance of express Router
const express = require('express');
const todoRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
// require the controller for todos
const todoController = require('../controllers/todo-controller');
// get controller.index route (get all todos on home page)
todoRouter.get('/', todoController.index);
// post controller.create route (post a new todo (login required))
todoRouter.post('/', authHelpers.loginRequired, todoController.create);
// render add page (options to add a new todo (login required))
todoRouter.get('/add', authHelpers.loginRequired, (req, res) => {
  res.render('todos/add-todo', {
    currentPage: 'Add Todo',
  });
});
// get controller.show route (get specific todo)
todoRouter.get('/:id', todoController.show);
// get controller.edit route (edit specific todo (login required))
todoRouter.get('/:id/edit', authHelpers.loginRequired, todoController.edit);
// get controller.update route (update specific todo (login required))
todoRouter.put('/:id', authHelpers.loginRequired, todoController.update);
// get controller.delete route (delete specific todo (login required))
todoRouter.delete('/:id', authHelpers.loginRequired, todoController.delete);

module.exports = todoRouter;