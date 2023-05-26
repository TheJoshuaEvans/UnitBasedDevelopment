/** @typedef {import('postgres').Sql} Sql */

const coreSchema = require('../../schemas/core.sql.js');

/**
 * @typedef InitDBParams
 * @property {Sql} sql SQL client to use to communicate with the server
 * @property {string=} tablePrefix Prefix to attach to table names
*/

/**
 * Initializes the database by running the core database schema with the provided parameters
 *
 * @param {InitDBParams} params
 */
const initDb = async (params) => {
  const {sql} = params;

  // Run the core schema
  await coreSchema(sql, params);
};

module.exports = initDb;
