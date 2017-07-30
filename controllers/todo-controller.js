// require todo object from model
const Todo = require('../models/todo');
// create an empty controller object
const todoController = {};
// main todo page, get every todo
todoController.index = (req, res) => {
  Todo.getAll()
  .then(todos => {
    res.render('todos/todo-index', {
      currentPage: 'Todo List',
      data: todos,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}
// main todo page, able to show detail on a selected todo
todoController.show = (req, res) => {
  Todo.getById(req.params.id)
  .then(todo => {
    res.render('todos/todo-info', {
      currentPage: 'Details',
      data: todo,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}
// add todo page, able to create a new todo
todoController.create = (req, res) => {
  Todo.add({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
  }, req.user.id).then(() => {
    res.redirect('todos');
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}
// on a selected todo, able to update a todo
todoController.update = (req, res) => {
  Todo.update({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
  }, req.params.id).then(todo => {
    res.redirect(`todos/${req.params.id}`);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}
// on edit todo page, edit the selected todo
todoController.edit = (req, res) => {
  Todo.byId(req.params.id)
  .then(todo => {
    res.render('todos/edit-todo', {
      currentPage: 'Edit Todo',
      data: todo,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}
// on a selected todo, delete todo and redirect to main todo page
todoController.delete = (req, res) => {
  Todo.delete(req.params.id)
  .then(() => {
    res.redirect('todos');
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}
// export todoController
module.exports = todoController;