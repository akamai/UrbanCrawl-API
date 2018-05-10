module.exports = {
  db: {
    connector: 'mysql',
    hostname: process.env.CLEARDB_DATABASE_URL || 'localhost',
    port: process.env.CLEARDB_PORT || 27017,
    user: process.env.CLEARDB_USERNAME,
    password: process.env.CLEARDB_PASSWORD,
    database: process.env.CLEARDB_NAME,
  }
};