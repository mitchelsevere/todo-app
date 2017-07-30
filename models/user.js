// require database config file
const db = require('../db/config');
// create a empty user object
const User = {};
// find user by username
User.getByUsername = (username) => {
  return db.one(`
  SELECT * FROM users
  WHERE username = $1
  `, [username]);
}
// create a new user
User.add = (user) => {
  return db.one(`
  INSERT INTO users
  (username, email, password_digest, firstname, lastname)
  VALUES
  ($1, $2, $3, $4, $5)
  RETURNING *
  `, [user.username, user.email, user.password_digest, user.firstname, user.lastname]);
}

// get user's todos
User.getUserTodos = (id) => {
  return db.many(`
  SELECT * FROM todos
  WHERE user_id = $1
  `, [id]);
}
// exports user object
module.exports = User;