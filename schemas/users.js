const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require('crypto');


const userScheme = new Schema({
  name: {
    type: String,
    required: true,
    minlength:3,
    maxlength:20
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },

},{ timestamps: {} });


userScheme.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

userScheme.virtual('userId')
  .get(function () {
    return this.id;
  });

userScheme.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = 'someSecret'//crypto.randomBytes(32).toString('base64');
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });


userScheme.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = userScheme;