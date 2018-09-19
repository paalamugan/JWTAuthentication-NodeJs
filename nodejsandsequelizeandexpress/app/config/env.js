const env = {
    database: 'optical',
    username: 'root',
    password: 'root',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    JWT_KEY:"secret"
  };

  module.exports = env;