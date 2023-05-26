/**
 * Wait for a specified amount of time
 *
 * @param {number} ms Number of milliseconds to wait
 */
const wait = async (ms) => {
  await new Promise((resolve) => setTimeout(() => {resolve();}, ms));
};

module.exports = wait;
