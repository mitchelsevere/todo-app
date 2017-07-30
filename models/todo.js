const db = require('../db/config');

const Todo = {};

Todo.getAll = () => {
  return db.query('SELECT * FROM todos');
}

Todo.getById = (id) => {
  return db.one(`
  SELECT * FROM todos
  WHERE id = $/id/
  `, [id]);
}

Todo.add = (todo, userid) => {
  return db.one(`
  INSERT INTO todos
  (title, category, description, user_id)
  VALUES 
  ($/title/, $/category/, $/description/, $/user_id/)
  RETURNING * 
  `, [todo.title, todo.category, todo.description, userid]);
}

Todo.update = (todo, id) => {
  return db.one(`
  UPDATE todos SET
  title = $/title/,
  category = $/category/,
  description = $/description/,
  WHERE id = $/id/
  RETURNING *
  `, [todo.title, todo.category, todo.description, id]);
}

Todo.delete = (id) => {
  return db.none(`
  DELETE FROM todos
  WHERE id = $/id/
  `, [id]);
}

module.exports = Todo;