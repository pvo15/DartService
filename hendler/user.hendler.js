const CRUD  = require('../lib/crud');
const userSchema  = require('../schemas/users');

class User extends CRUD {
  constructor(){
    super('Users', userSchema)
  }
  static getUser(){
    console.log('gettttt')
  }
}
 const userCrud = new User();
module.exports = userCrud;