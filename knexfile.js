// Update with your config settings.

module.exports = {

  development: {
    client : 'pg',
  connection: {
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
  }, 
  migrations: {
    tableName: 'migrations',
    directory: './migrations'
  }, 
  seeds: {
    directory: './seeds'
  }
  },

  staging: {
    client : 'pg',
  connection: {
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
  }, 
  migrations: {
    tableName: 'migrations',
    directory: './migrations'
  }, 
  seeds: {
    directory: './seeds'
  }
  },

  production: {
    client : 'pg',
  connection: {
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
  }, 
  migrations: {
    tableName: 'migrations',
    directory: './migrations'
  }, 
  seeds: {
    directory: './seeds'
  }
  }

};
