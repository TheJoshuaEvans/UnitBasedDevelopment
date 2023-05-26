// This test helper, when included at the top of a file, will silence all console logs for that
// particular test run. This can be useful when dependencies write error logs, but we don't want
// them cluttering up our test results

const consoleLogMock = jest.spyOn(global.console, 'log').mockImplementation(() => {
  // Silence is golden...
});
const consoleErrorMock = jest.spyOn(global.console, 'error').mockImplementation(() => {
  // Silence is golden...
});

beforeEach(() => {
  consoleLogMock.mockClear();
  consoleErrorMock.mockClear();
});

afterAll(() => {
  consoleErrorMock.mockRestore();
  consoleLogMock.mockRestore();
});

module.exports = {
  consoleLogMock, consoleErrorMock,
};
