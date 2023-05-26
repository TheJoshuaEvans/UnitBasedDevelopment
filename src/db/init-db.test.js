const sqlConfig = require('../../config/sql.config.js');
const testConfig = require('../../config/test.config.js');

const initDb = require('./init-db.js');
const instantiateDbClient = require('./instantiate-db-client.js');

require('../../test/utils/log-mock.js');

/** @type {import('postgres').Sql} */
let sql;
const tablePrefix = 'initDbTest';

/**
 * Cleans up tables made for the tests
 * @param {string} tablePrefix
 */
const cleanTables = async (tablePrefix) => {
  await sql.begin(async () => {
    // Drop the prefixed tables
    await sql`DROP TABLE ${sql(tablePrefix + sqlConfig.POSTGRES_TABLE)}`;
  });
};

describe('init-db', function() {
  beforeAll(async () => {
    sql = await instantiateDbClient({
      host: testConfig.POSTGRES_HOST,
      port: testConfig.POSTGRES_PORT,
      user: testConfig.POSTGRES_USER,
      pass: testConfig.POSTGRES_PASSWORD,
    });
  });

  it('should have already created all tables', async () => {
    // The database is initialized before tests are run, so all the expected tables should
    // already be present
    const result = await sql`SELECT tablename FROM pg_catalog.pg_tables`;
    const allTableNames = result.map(item => item.tablename);

    expect(allTableNames).toContain(sqlConfig.POSTGRES_TABLE);
  });

  it('should init with provided table name prefix', async () => {
    await initDb({sql, tablePrefix});
    const result = await sql`SELECT tablename FROM pg_catalog.pg_tables`;
    const allTableNames = result.map(item => item.tablename);
    expect(allTableNames).toContain(tablePrefix + sqlConfig.POSTGRES_TABLE);
  });

  afterAll(async () => {
    await cleanTables(tablePrefix);
    await sql.end();
  });
});
