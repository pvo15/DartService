const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;


const config = {
  tokenLife: 9600
}

const Client = require('../../hendler/client.hendler');

const AccessToken = require('../../hendler/accessToken.hendler');
const RefreshToken = require('../../hendler/refreshToken.hendler');
const User = require('../../hendler/user.hendler');


// 2 Client Password strategies - 1st is required, 2nd is optional
// https://tools.ietf.org/html/draft-ietf-oauth-v2-27#section-2.3.1

// Client Password - HTTP Basic authentication
passport.use(new BasicStrategy(
  async function (username, password, done) {
    const client = await Client.findOne({ clientId: username });
    if (!client) {
      return done(null, false);
    }

    if (client.clientSecret !== password) {
      return done(null, false);
    }

    return done(null, client);
  }
));

// Client Password - credentials in the request body
passport.use(new ClientPasswordStrategy(
  async function (clientId, clientSecret, done) {
    try{
      const client = await Client.findOne({ clientId: clientId });


      if (!client) {
        return done(null, false);
      }
      if (client.clientSecret !== clientSecret) {
        return done(null, false);
      }
      return done(null, client);


    }catch (err){
      done(err, null)

    }

  }
));

passport.use(new BearerStrategy(
  async function (accessToken, done) {
    try{
      const token = await AccessToken.findOne({ token: accessToken });

      if (!token) {
        return done(null, false);
      }
      if (Math.round((Date.now() - token.createdAt) / 1000) > config.tokenLife) {

        await AccessToken.remove({ token: accessToken });

        return done(null, false, { message: 'Token expired' });
      }

      const user = await User.findById({_id: token.userId});
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      const info = { scope: '*' };
      done(null, user, info);
    }catch (err){
      done(err,null);
    }

  }
));
