// require database config file
const db = require('../db/config');
// create a empty user object
const User = {};
// find user by username
User.getByUsername = (username) => {
  return db.one(`
  SELECT * FROM users
  WHERE username = $/username/
  `, [username]);
}
// create a new user
User.add = (user) => {
  return db.one(`
  INSERT INTO users
  (username, email, password_digest, firstname, lastname)
  VALUES
  ($/username/, $/email/, $/password_digest/, $/firstname/, $/lastname/)
  RETURNING *
  `, [user.username, user.email, user.password_digest, user.firstname, user.lastname]);
}
// exports user object
module.exports = User;