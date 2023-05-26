const S3 = require('@aws-sdk/client-s3');

const testConfig = require('../config/test.config.js');

const instantiateAwsClient = require('../src/aws/instantiate-aws-client.js');
const initDb = require('../src/db/init-db.js');
const instantiateDbClient = require('../src/db/instantiate-db-client.js');
const wait = require('../src/utils/wait.js');

const originalLog = console.log;

/**
 * Internal method handles all database setup procedures for testing
 */
const setupDb = async () => {
  const sql = await instantiateDbClient({
    user: testConfig.POSTGRES_USER,
    pass: testConfig.POSTGRES_PASSWORD,
    host: testConfig.POSTGRES_HOST,
    port: testConfig.POSTGRES_PORT,
  });

  let dbInitialized = false;
  for (let attempts = 0; !dbInitialized && attempts < testConfig.SETUP_RETRY_LIMIT; attempts++) {
    try {
      console.log(`\nPostgreSQL connection test ${attempts}`);
      await sql`SELECT * FROM pg_catalog.pg_tables`;
      console.log('PostgreSQL connection test successful!\n');

      console.log('Initializing PostgreSQL...');
      console.log = () => {}; // Suppress logs for db initiation
      await initDb({sql});
      console.log = originalLog;
      console.log('PostgreSQL initialization complete!\n');

      await sql.end();
      dbInitialized = true;
    } catch(e) {
      console.log = originalLog;
      console.log(e);
      // There was an error. Wait before trying again
      await wait(testConfig.SETUP_WAIT_TIME);
    }
  }

  if (!dbInitialized) {
    // We ran out of attempts to initialize the database - kill the process
    console.log('Could not connect to PostgreSQL. Ending process.');
    await sql.end();
    process.exit(1);
  }
};

const setupS3 = async () => {
  /** @type {S3.S3Client} */
  const s3Sdk = instantiateAwsClient(S3.S3Client, {
    endpoint: testConfig.LOCAL_AWS_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: 'bar',
      secretAccessKey: 'foo',
    },
  });

  let s3Initialized = false;
  for (let attempts = 0; !s3Initialized && attempts < testConfig.SETUP_RETRY_LIMIT; attempts++) {
    try {
      console.log(`\nS3 connection test ${attempts}`);
      // If the connection cannot be made, this will trigger an error
      await s3Sdk.send(new S3.ListBucketsCommand({}));
      console.log('S3 connection test successful!\n');

      console.log('Initializing S3...');
      await s3Sdk.send(new S3.CreateBucketCommand({
        Bucket: testConfig.TEST_BUCKET_NAME,
      }));
      console.log('S3 initialization complete!\n');

      s3Initialized = true;
    } catch(e) {
      console.log(e);
      // There was an error. Wait before trying again
      await new Promise((resolve) => {
        setTimeout(() => resolve(), testConfig.SETUP_WAIT_TIME);
      });
    }
  }

  if (!s3Initialized) {
    // We ran out of attempts to initialize S3 - kill the process
    console.log('Could not connect to S3. Ending process.');
    process.exit(1);
  }
};

/**
 * This little helper ensures that a local systems are all set up and ready for testing
 */
module.exports = async () => {
  await setupDb();
  await setupS3();
};
