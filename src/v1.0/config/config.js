const path = require('path');
require('dotenv').config();

const { DATABASE, USERNAME, PASSWORD, HOST, DB_PORT} = process.env;
module.exports = 
  {
    username: 'postgres',
    password: '1234',
    host: HOST,
    database: "hotel",
    // host: 'localhost',
    port: DB_PORT,
    dialect: 'postgres',
    
    
    /*  test: {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DATABASE,
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'postgres',
    },
    production: {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DATABASE,
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'postgres',
    },  */
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  },
  }

 


