const {
  db: { username, password, database, host },
} = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'postgres://ruecajdmddohgz:07d8f57129f62c096adb001884a9840ae20ff26ad9419b07dd9cf7d929bb02a8@ec2-44-194-6-121.compute-1.amazonaws.com:5432/d5olftjrbnh5nd',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
};
