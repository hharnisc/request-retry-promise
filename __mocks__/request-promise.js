jest.autoMockOff();
require.requireActual('bluebird');
const requestPromise = jest.genMockFromModule('request-promise');
jest.autoMockOn();
module.exports = requestPromise;
