/** @typedef {import('@aws-sdk/client-s3').S3Client} S3Client */
/** @typedef {import('@aws-sdk/client-s3').GetObjectOutput} GetObjectOutput */

const { GetObjectCommand } =  require('@aws-sdk/client-s3');

/**
 * Helper method takes a read stream and resolves with a fully buffered string representation
 * of the data. Used to facilitate getting string data from S3
 *
 * @param {StreamToStringParams} params Read stream
 */
const streamToString = async (params) => {
  const {stream, encoding = 'utf8'} = params;

  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString(encoding)));
  });
};

/**
 * @typedef GetObjectParams
 * @property {S3Client} s3Sdk S3 client to use for communication
 * @property {string} bucketName Name of the bucket to get data from
 * @property {string} key Key of the object to retrieve
*/

/**
 * Retrieves a data object from S3. Will throw an error if the item cannot be found
 *
 * @param {GetObjectParams} params
 *
 * @returns {object}
 */
const getObject = async (params) => {
  const {s3Sdk, bucketName, key} = params;

  let obj = null;
  let getObjRes = null;

  getObjRes = await s3Sdk.send(new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  }));
  const objString = await streamToString({stream: getObjRes.Body});
  obj = JSON.parse(objString);

  return obj;
};

getObject.streamToString = streamToString;

module.exports = getObject;
