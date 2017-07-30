// require passport
const passport = require('passport');
// require user model
const User = require('../../models/user');
// export serial and deserial functions
module.exports = () => {
  // unsure what these functions do
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    User.getByUsername(username)
    .then(user => {
      done(null, user);
    }).catch(err => {
      done(err, null);
    });
  });
  
}