const S3 = require('@aws-sdk/client-s3');
const {v4:uuid} = require('uuid');

const testConfig = require('../../config/test.config.js');

const getObject = require('./get-object.js');
const putObject = require('./put-object.js');
const instantiateAwsClient = require('../aws/instantiate-aws-client.js');

let s3Sdk;

describe('get-object', function() {
  const testId = uuid();
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

  it('should retrieve an object put in the S3 bucket', async () => {
    const newObject = {
      foo: {
        bar: 'bam',
      },
    };
    const key = `get-object-test-object${testId}.json`;
    const result = await putObject({
      s3Sdk: s3Sdk, bucketName: testConfig.TEST_BUCKET_NAME, key,
      obj: newObject,
    });
    expect(result).toBeDefined();

    // Check that the object actually exists
    const actual = await getObject({
      s3Sdk, bucketName: testConfig.TEST_BUCKET_NAME, key,
    });
    expect(actual).toMatchObject(newObject);
  });
});
