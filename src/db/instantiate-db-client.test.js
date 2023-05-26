const sqlConfig = require('../../config/sql.config.js');
const testConfig = require('../../config/test.config.js');
const instantiateDbClient = require('./instantiate-db-client.js');

describe('instantiate-db-client', function() {
  it('should instantiate postgres client with default values', async () => {
    const sql = await instantiateDbClient();

    const {options} = sql;
    expect(options).toMatchObject({
      host: [sqlConfig.POSTGRES_HOST],
      port: [sqlConfig.POSTGRES_PORT],
      database: sqlConfig.POSTGRES_DATABASE,
      user: sqlConfig.POSTGRES_USER,
      pass: sqlConfig.POSTGRES_PASSWORD,
    });

    await sql.end();
  });

  it('should instantiate postgres client with test config values', async () => {
    const sql = await instantiateDbClient({
      user: testConfig.POSTGRES_USER,
      pass: testConfig.POSTGRES_PASSWORD,
      host: testConfig.POSTGRES_HOST,
      port: testConfig.POSTGRES_PORT,
    });

    const {options} = sql;
    expect(options).toMatchObject({
      host: [testConfig.POSTGRES_HOST],
      port: [testConfig.POSTGRES_PORT],
      database: sqlConfig.POSTGRES_DATABASE,
      user: testConfig.POSTGRES_USER,
      pass: testConfig.POSTGRES_PASSWORD,
    });

    await sql.end();
  });
});
