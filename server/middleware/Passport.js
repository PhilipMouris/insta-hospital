const { Strategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_KEY;

const authorize = passport => {
  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
      if (jwtPayload) return done(null, jwtPayload);
      return done(null, false);
    })
  );
};

module.exports = authorize;
