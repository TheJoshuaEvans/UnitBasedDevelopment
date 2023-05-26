const awsConfig = require('../../config/aws.config.js');

const instantiateClient = require('./instantiate-aws-client.js');
class TestClient {
  constructor(opts) {
    expect(opts).toMatchObject({region: awsConfig.AWS_STACK_REGION});

    this.success = true;
  }
}

const testOpts = {
  foo: 'bar',
  num: 123,
};
class TestClientWithOpts {
  constructor(opts) {
    expect(opts).toMatchObject({
      region: awsConfig.AWS_STACK_REGION,
      ...testOpts,
    });

    this.success = true;
  }
}

describe('instantiate-aws-client', function() {
  it('should instantiate correctly', () => {
    const client = instantiateClient(TestClient);
    expect(client.success).toBe(true);
  });

  it('should instantiate correctly with additional options', () => {
    const client = instantiateClient(TestClientWithOpts, testOpts);
    expect(client.success).toBe(true);
  });

  it('should attach region to empty object', () => {
    const client = instantiateClient(TestClient, {});
    expect(client.success).toBe(true);
  });
});

