import test from 'tape';
import tapSpec from 'tap-spec';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);


const setup = () => {
  const requestSpy = sinon.stub();
  const retrySpy = sinon.stub();
  return {
    requestSpy,
    retrySpy,
    sut: proxyquire('../src/index', {
      'request-promise': requestSpy,
      'retry-promise': {
        default: (options, retryable) => {
          retrySpy(options, retryable);
          retryable();
        },
      },
    }).default,
  };
};

test('Called With Default Arguments', (t) => {
  const { requestSpy, retrySpy, sut } = setup();
  const uri = 'http://google.com';
  sut({ uri });
  t.equal(true, retrySpy.calledWith({
    max: 5,
    backoff: 1000,
  }), 'retryPromise is called with expected args');
  t.equal(true, requestSpy.calledWith({
    method: 'GET',
    uri,
    json: true,
    resolveWithFullResponse: true,
  }), 'requestPromise is called with expected args');
  t.end();
});

test('Explodes when missing uri', (t) => {
  const { sut } = setup();
  t.throws(() => (sut()), 'boom!');
  t.end();
});
