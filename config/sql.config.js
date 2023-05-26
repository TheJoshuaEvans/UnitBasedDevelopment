/**
 * Configurations used by SQL processes
 */
const sqlConfig = {
  /**
   * @type {string}
   * Base name of the table to use when running tests
   */
  POSTGRES_TABLE: process.env.POSTGRES_TABLE || 'demo',

  /**
   * @type {string}
   * User for the production  PostgreSQL server
   */
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',

  /**
   * @type {string}
   * Password for the production  PostgreSQL server
   */
  POSTGRES_PASSWORD: 'postgres',

  /**
   * @type {string}
   * Host for the production PostgreSQL server
   */
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',

  /**
   * @type {number}
   * Port for the production  PostgreSQL server
   */
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT) || 5432,

  /**
   * @type {string}
   * Name of the database to use
   */
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || 'main',
};

module.exports = sqlConfig;
