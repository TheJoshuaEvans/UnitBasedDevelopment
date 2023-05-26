/** @typedef {import('@aws-sdk/client-s3').S3Client} S3Client */
/** @typedef {import('@aws-sdk/client-s3').PutObjectOutput} PutObjectOutput */

const { PutObjectCommand } =  require('@aws-sdk/client-s3');

/**
 * @typedef PutObjectParams
 * @property {S3Client} s3Sdk S3 client to use for communication
 * @property {string} bucketName Name of the bucket to put data into
 * @property {string} key Key of the object to add
 * @property {object|string} obj The object to add to S3. Will be stringified if not
 *  a string already
*/

/**
 * Puts a new object into S3
 *
 * @param {PutObjectParams} params
 *
 * @returns {PutObjectOutput}
 */
const putObject = async (params) => {
  const {s3Sdk, bucketName, key, obj} = params;

  const objString = typeof obj === 'string' ? obj : JSON.stringify(obj);

  const putCommandOptions = {
    Bucket: bucketName,
    Key: key,
    Body: objString,
  };
  const putObjectResponse = await s3Sdk.send(new PutObjectCommand(putCommandOptions));

  return putObjectResponse;
};

module.exports = putObject;
