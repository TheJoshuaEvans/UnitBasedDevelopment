const sqlConfig = require('../config/sql.config.js');

/**
 * @typedef CoreSchemaOpts
 * @property {string=} tablePrefix Optional prefix to apply to table names
 */

/**
 * Takes a database client and uses it to initialize the demo database
 *
 * @param {import('postgres').Sql} sql Instantiated SQL client
 * @param {CoreSchemaOpts} opts
 */
module.exports = async function(sql, opts = {}) {
  const {tablePrefix = ''} = opts;

  await sql.begin((async (sql) => {
    await sql`
    CREATE TABLE IF NOT EXISTS ${sql(tablePrefix + sqlConfig.POSTGRES_TABLE)} (
      "id" VARCHAR ( 128 ) PRIMARY KEY,
      "name" VARCHAR ( 255 ) UNIQUE NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
    )`;
  }));
};
