/*module.exports = {
  "development": {
    "username": "root",
    "password": "GreenGoodPass",
    "database": "greengood_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
*/

const config = {
  development: {
    username: "root",
    password: '',
    database: "greengood_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: '',
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: '',
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}

module.exports =  config;