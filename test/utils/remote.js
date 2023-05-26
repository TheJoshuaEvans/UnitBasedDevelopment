const runRemote = process.env.RUN_REMOTE === 'true';

/**
 * Helper object will contain the regular Jest testing method if we are meant to run remote
 * tests, and the "skipped" versions if we are not
 */
const remote = {
  describe: runRemote ? describe : describe.skip,
  it: runRemote ? it : it.skip,
};

module.exports = remote;
