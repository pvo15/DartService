const Users = require('../../controller/user');
const oauth = require('../../lib/auth/oauth2');
const passport = require('passport');


module.exports = function(router) {
  router.post('/user', Users.createUser);
  router.get('/user/me', passport.authenticate('bearer', { session: false }), Users.getUser);
  router.post('/oauth/token', oauth.token);
}