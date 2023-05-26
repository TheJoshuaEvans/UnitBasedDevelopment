/**
 * Configuration object for values used by AWS services
 */
const awsConfig = {
  /**
   * @type {string}
   * Region to resources would be deployed to
   */
  AWS_STACK_REGION: process.env.AWS_STACK_REGION || 'us-east-1',
};

module.exports = awsConfig;
