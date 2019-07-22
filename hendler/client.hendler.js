const CRUD  = require('../lib/crud');
const client  = require('../schemas/client');

class Client extends CRUD {
  constructor(){
    super('client', client)
  }
  static getUser(){
    console.log('gettttt')
  }
}
const clientCrud = new Client();
module.exports = clientCrud;