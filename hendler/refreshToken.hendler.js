const CRUD  = require('../lib/crud');
const refreshToken  = require('../schemas/refreshToken');

class RefreshToken extends CRUD {
  constructor(){
    super('refreshToken', refreshToken)
  }
  static getUser(){
    console.log('gettttt')
  }
}
const refreshTokenCrud = new RefreshToken();
module.exports = refreshTokenCrud;