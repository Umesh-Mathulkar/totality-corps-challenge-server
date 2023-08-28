const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/User');

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'SECRET_KEY',
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    // Find the user specified in the token
    const user = await User.findById(jwtPayload.userId);

    // If the user was found, return it
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    // Handle any errors that occurred
    return done(err);
  }
}));
