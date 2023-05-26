const awsConfig = require('../../config/aws.config.js');

/**
 * Instantiates an AWS SDK client object, automatically applying the correct region
 *
 * @param {class} ClientClass Class definition of the desired AWS client
 * @param {object} opts Additional options to pass to the constructor
 */
function instantiateClient(ClientClass, opts = {}) {
  opts = {
    region: awsConfig.AWS_STACK_REGION,
    ...opts,
  };

  const client = new ClientClass(opts);

  return client;
}

module.exports = instantiateClient;
