const CRUD  = require('../lib/crud');
const accessTokenSchema  = require('../schemas/accessToken');

class AccessToken extends CRUD {
  constructor(){
    super('accessTokens', accessTokenSchema)
  }
  static getUser(){
    console.log('gettttt')
  }
}
const accessTokenCrud = new AccessToken();
module.exports = accessTokenCrud;