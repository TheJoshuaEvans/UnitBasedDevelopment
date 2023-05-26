const S3 = require('@aws-sdk/client-s3');

const testConfig = require('../../config/test.config.js');

const getObject = require('./get-object.js');
const putObject = require('./put-object.js');
const instantiateAwsClient = require('../aws/instantiate-aws-client.js');

/** @type {S3.S3Client} */
let s3Sdk;

describe('put-object', function() {
  beforeAll(() => {
    s3Sdk = instantiateAwsClient(S3.S3Client, {
      endpoint: testConfig.LOCAL_AWS_ENDPOINT,
      forcePathStyle: true,
      credentials: {
        accessKeyId: 'bar',
        secretAccessKey: 'foo',
      },
    });
  });

  it('should put an object into the test S3 bucket', async () => {
    const newObject = {
      foo: {
        bar: 'bam',
      },
    };
    const key = 'test-object.json';
    const result = await putObject({
      s3Sdk, bucketName: testConfig.TEST_BUCKET_NAME, key,
      obj: newObject,
    });
    expect(result).not.toBeNull();

    // Check that the object actually exists
    const actual = await getObject({s3Sdk, key, bucketName: testConfig.TEST_BUCKET_NAME});
    expect(actual).toMatchObject(newObject);
  });

  it('should put a pre-stringified object', async () => {
    const newObject = {
      foo: {
        bar: 'bam',
      },
    };
    const key = 'test-object.json';
    const result = await putObject({
      s3Sdk, bucketName: testConfig.TEST_BUCKET_NAME, key,
      obj: JSON.stringify(newObject),
    });
    expect(result).not.toBeNull();

    // Check that the object actually exists
    const actual = await getObject({s3Sdk, key, bucketName: testConfig.TEST_BUCKET_NAME});
    expect(actual).toMatchObject(newObject);
  });
});
