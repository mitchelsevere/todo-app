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
  WHERE id = $1
  `, [id]);
}
// create a new todo
Todo.add = (todo, userid) => {
  return db.one(`
  INSERT INTO todos
  (title, category, description, user_id)
  VALUES 
  ($1 $2, $3, $4)
  RETURNING * 
  `, [todo.title, todo.category, todo.description, userid]);
}
// update a new todo
Todo.update = (todo, id) => {
  return db.one(`
  UPDATE todos SET
  title = $1,
  category = $2,
  description = $3,
  WHERE id = $4
  RETURNING *
  `, [todo.title, todo.category, todo.description, id]);
}
// delete a todo
Todo.delete = (id) => {
  return db.none(`
  DELETE FROM todos
  WHERE id = $1
  `, [id]);
}
// export todo object
module.exports = Todo;