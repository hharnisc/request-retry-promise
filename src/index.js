import requestPromise from 'request-promise';
import retry from 'retry-promise';

const index = (requestOptions = {}, retryOptions = {}) => {
  if (!requestOptions.uri) {
    throw new Error('Expecting uri parameter in requestOptions');
  }
  const defaultRequestOptions = {
    method: 'GET',
    json: true,
    resolveWithFullResponse: true,
  };
  const completeRequestOptions = Object.assign({}, defaultRequestOptions, requestOptions);
  const defaultRetryOptions = {
    max: 5,
    backoff: 1000,
  };
  const completeRetryOptions = Object.assign({}, defaultRetryOptions, retryOptions);
  const retryableRequest = () => requestPromise(completeRequestOptions);
  return retry(completeRetryOptions, retryableRequest);
};

export default index;
