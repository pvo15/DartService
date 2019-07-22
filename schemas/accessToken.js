const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accessTokenShcema = new Schema({
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
}, { timestamps: {} });

module.exports = accessTokenShcema;