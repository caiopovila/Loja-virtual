require('dotenv').config();

let config = {
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PWD,
    database: process.env.BD_NAME
};

  module.exports = config;
  