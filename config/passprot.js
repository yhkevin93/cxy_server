var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcryptjs');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'restaurant_id',
    passwordField: 'password'
  },
  function(restaurant_id, password, done) {

    User.findOne({ restaurant_id: restaurant_id }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { result:'没有该用户' });
      }

      bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
             result:'密码错误'
            });
          var returnUser = user;
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        });
    });
  }
));
