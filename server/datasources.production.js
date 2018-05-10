module.exports = {
  db_name: {
    connector: 'mysql',
    hostname: process.env.CLEARDB_DATABASE_URL,
    port: process.env.CLEARDB_PORT,
    user: process.env.CLEARDB_USERNAME,
    password: process.env.CLEARDB_PASSWORD,
    database: process.env.CLEARDB_NAME,
  }
};