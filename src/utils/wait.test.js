const remote = require('../../test/utils/remote.js');

const wait = require('./wait.js');

describe('wait', function() {
  // Simulating a remote request by asynchronously waiting
  remote.it('Should wait for 1 second', async () => {
    const startTime = Date.now();

    // Wait two seconds
    const waitTime = 2000;
    await wait(waitTime);

    const waitLeeway = 100;
    expect(Date.now()).toBeGreaterThan(startTime + waitTime - waitLeeway);
  });
});
