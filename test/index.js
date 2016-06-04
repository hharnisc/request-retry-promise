jest.unmock('../src/index');
jest.mock('request-promise');
import index from '../src/index';
import requestPromise from 'request-promise';
import retry from 'retry-promise';


describe('request-retry-promise', () => {
  it('exists', () => {
    expect(index)
      .not.toEqual({});
  });

  pit('does make a request', () => {
    const uri = 'http://google.com';
    requestPromise.mockImplementation(() => new Promise((resolve) => resolve()));
    retry.mockImplementation((options, retryable) => retryable());
    return index({ uri })
      .then(() => {
        expect(retry)
          .toBeCalledWith({
            max: 5,
            backoff: 1000,
          }, jasmine.any(Function));
        expect(requestPromise)
          .toBeCalledWith({
            method: 'GET',
            uri,
            json: true,
            resolveWithFullResponse: true,
          });
      });
  });

  it('does explode when missing uri param', () => {
    expect(() => index())
      .toThrow(Error('Expecting uri parameter in requestOptions'));
  });
});
