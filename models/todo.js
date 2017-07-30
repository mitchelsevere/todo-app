// require database config file
const db = require('../db/config');
// create an empty todo object
const Todo = {};
// get all todos
Todo.getAll = () => {
  return db.query('SELECT * FROM todos');
}
// get todo by id
Todo.getById = (id) => {
  return db.one(`
  SELECT * FROM todos
  WHERE id = $/id/
  `, [id]);
}
// create a new todo
Todo.add = (todo, userid) => {
  return db.one(`
  INSERT INTO todos
  (title, category, description, user_id)
  VALUES 
  ($/title/, $/category/, $/description/, $/user_id/)
  RETURNING * 
  `, [todo.title, todo.category, todo.description, userid]);
}
// update a new todo
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
// delete a todo
Todo.delete = (id) => {
  return db.none(`
  DELETE FROM todos
  WHERE id = $/id/
  `, [id]);
}
// export todo object
module.exports = Todo;