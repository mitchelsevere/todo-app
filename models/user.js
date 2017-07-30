const db = require('../db/config');

const User = {};

User.getByUsername = (username) => {
  return db.one(`
  SELECT * FROM users
  WHERE username = $/username/
  `, [username]);
}

User.add = (user) => {
  return db.one(`
  INSERT INTO users
  (username, email, password_digest, firstname, lastname)
  VALUES
  ($/username/, $/email/, $/password_digest/, $/firstname/, $/lastname/)
  RETURNING *
  `, [user.username, user.email, user.password_digest, user.firstname, user.lastname]);
}

module.exports = User;