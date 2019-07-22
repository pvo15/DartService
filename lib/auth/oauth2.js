
const oauth2orize = require('oauth2orize');
const passport = require('passport');
const crypto = require('crypto');

const config = {
  tokenLife: 9600
}

const AccessToken = require('../../hendler/accessToken.hendler');
const RefreshToken = require('../../hendler/refreshToken.hendler');
const User = require('../../hendler/user.hendler');

const aserver = oauth2orize.createServer();


// Destroy any old tokens and generates a new access and refresh token
const generateTokens = function (data) {

  // Curries in `done` callback so we don't need to pass it
  return new Promise(async (resolve, reject) => {
    let
      refreshTokenValue,
      tokenValue;

    await RefreshToken.remove(data);
    await AccessToken.remove(data);

    tokenValue = crypto.randomBytes(32).toString('hex');
    refreshTokenValue = crypto.randomBytes(32).toString('hex');

    data.token = tokenValue;
    await AccessToken.create(data);

    data.token = refreshTokenValue;
    await RefreshToken.create(data);

    const finalToken = {
      tokenValue,
      refreshTokenValue,
      'expires_in': config.tokenLife
    }
    resolve(finalToken);

  });
};

aserver.exchange(oauth2orize.exchange.password(async function (client, username, password, scope, done) {
  try{
    const user = await User.findOne({ email: username });

    if (!user || !user.checkPassword(password)) {
      return done(null, false);
    }

    const model = {
      userId: user.userId,
      clientId: client.clientId
    };

    const token = await generateTokens(model);
    done(null,token.tokenValue,token.refreshTokenValue,{expires_in: token.expires_in});

  }catch(err){
    console.log('outh err',err)
  }

}));


// Exchange refreshToken for access token
aserver.exchange(oauth2orize.exchange.refreshToken(async function (client, refreshToken, scope, done) {

  const token  = await RefreshToken.findOne({ token: refreshToken, clientId: client.clientId });
  if (!token) {
    done(null, false)

  }
  const user = User.findById(token.userId);

  if (!user) {
    done(null, false)
  }

  const model = {
    userId: user.userId,
    clientId: client.clientId
  };

  const token = await generateTokens(model, done);
  done(token);
}));

exports.token = [
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  aserver.token(),
  aserver.errorHandler()
];