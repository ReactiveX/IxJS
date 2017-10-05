import * as Ix from '../Ix';
import * as test from 'tape-async';
const { ofValues } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#ofValues behavior', async t => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofValues(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 'Bob');
  await hasNext(t, it, 'Smith');
  await noNext(t, it);
  t.end();
});
