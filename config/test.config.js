/**
 * Configuration object for values used only in testing
 */
const testConfig = {
  /**
   * @type {string}
   * User for the local PostgreSQL server
   */
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',

  /**
   * @type {string}
   * Password for the local PostgreSQL server
   */
  POSTGRES_PASSWORD: 'postgres',

  /**
   * @type {string}
   * Host for the localPostgreSQL server
   */
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',

  /**
   * @type {number}
   * Port for the local PostgreSQL server
   */
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT) || 5432,

  /**
   * @type {number}
   * Maximum number of times to try connecting to the database in setup before giving up
   */
  SETUP_RETRY_LIMIT: Number(process.env.SETUP_RETRY_LIMIT) || 10,

  /**
   * @type {number}
   * Amount of time in ms to wait between each database connection test attempt
   */
  SETUP_WAIT_TIME: Number(process.env.SETUP_WAIT_TIME) || 1000,

  /**
   * @type {string}
   * Name to use for the test bucket
   */
  TEST_BUCKET_NAME: process.env.TEST_BUCKET_NAME || 'ubd-test-bucket',

  /**
   * @type {string}
   * Endpoint to use when connecting to localstack
   */
  LOCAL_AWS_ENDPOINT: process.env.LOCAL_AWS_ENDPOINT || 'http://localhost:4566',

  /**
   * @type {bool}
   * If remote tests should be run. Only works if RUN_REMOTE is set to exactly "true"
   */
  RUN_REMOTE: process.env.RUN_REMOTE === 'true' ? true : false,
};

module.exports = testConfig;
