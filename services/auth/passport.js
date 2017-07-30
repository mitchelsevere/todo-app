
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport');
// require user model
const User = require('../../models/user');
// require auth-helper helper function
const authHelpers = require('./auth-helpers');
// empty options object
const options = {};
// initialize init
init();
// passport function (unsure what it's doing)
passport.use(
  new LocalStrategy(options, (username, password, done) => {
    User.getByUsername(username)
    .then(user => {
      if (!user) {
        return done(null, false);
      }
      if (!authHelpers.comparePass(password, user.password_digest)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }).catch(err => {
      console.log(err);
      return done(err);
    });
  })
)

// export passport
module.exports = passport;