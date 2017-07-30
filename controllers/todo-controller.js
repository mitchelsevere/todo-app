const Todo = require('../models/todo');

const todoController = {};

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

todoController.delete = (req, res) => {
  Todo.delete(req.params.id)
  .then(() => {
    res.redirect('todos');
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

module.exports = todoController;