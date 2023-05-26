/** @typedef {import('postgres').Sql} Sql */

const postgres = require('postgres');

const sqlConfig = require('../../config/sql.config.js');

/**
 * @typedef InstantiateDbClientParams
 * @property {string=} host Database connection host
 * @property {number=} port Database connection port
 * @property {string=} database Name of the PostgreSQL database
 * @property {string=} user Database user
 * @property {string=} pass Database user password
 * @property {object=} options Additional options to pass to the client constructor
*/

/**
 * Creates a new database client, applying default parameters from the sql configuration
 *
 * @param {InstantiateDbClientParams=} params
 *
 * @returns {Sql}
 */
const instantiateDbClient = async (params = {}) => {
  const {
    host = sqlConfig.POSTGRES_HOST,
    port = sqlConfig.POSTGRES_PORT,
    database = sqlConfig.POSTGRES_DATABASE,
    user = sqlConfig.POSTGRES_USER,
    pass = sqlConfig.POSTGRES_PASSWORD,
    options = {},
  } = params;

  return postgres({
    ...options,
    host, port, database, user, pass,
  });
};

module.exports = instantiateDbClient;
