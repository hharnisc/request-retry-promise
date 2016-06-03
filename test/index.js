import test from 'tape';
import index from '../src/index';

test('request-retry-promise tests', (t) => {
  t.equal(index(), true, 'succeeds');
  t.end();
});
