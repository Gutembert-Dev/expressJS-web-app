const {PropertyFile} = require(__dirname + '/tools/PropertyFile');
var environments      = require(__dirname + '/tools/environments');
var properties       = PropertyFile.getProperties(environments);
        
module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: __dirname + '/camer.sqlite3'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: properties.get('database.staging.name'),
      user:     properties.get('database.username'),
      password: properties.get('database.password')
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_camerstag_migrations',
      directory: __dirname + '/db/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: properties.get('database.production.name'),
      user:     properties.get('database.username'),
      password: properties.get('database.password')
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_camerpro_migrations',
      directory: __dirname + '/db/migrations'
    }
  }

};
