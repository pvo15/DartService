const dotenv = require('dotenv/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRout = require('../api/user');
const db = require('../db');
const router = express.Router();
const passport = require('passport');

require('../lib/auth/auth');

const client = require('../hendler/client.hendler');

// client.create({
//   "name" : "Android API v1",
//   "clientId" : "android",
//   "clientSecret" : "SomeRandomCharsAndNumbers",
// });


 /* {
    "_id" : ObjectId("5d345dad256d6a2698214919"),
  "name" : "Android API v1",
  "clientId" : "android",
  "clientSecret" : "SomeRandomCharsAndNumbers",
  "__v" : 0
}*/





app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, OPTIONS");
      return next();
    });
app.use(passport.initialize());


app.use('/',router);
userRout(router);



db()

// app.get('*', (req, res) => {
//   res.send('Hello World!');
// });
// app.post('*', (req, res) => {
//
// });

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
