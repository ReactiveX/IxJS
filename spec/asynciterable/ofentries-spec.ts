import * as Ix from '../Ix';
import * as test from 'tape-async';
const { ofEntries } = Ix.asynciterable;
import { noNext } from '../asynciterablehelpers';

test('AsyncIterable#ofEntries behavior', async t => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofEntries(xs);

  const it = ys[Symbol.asyncIterator]();
  let next = await it.next();
  t.false(next.done);
  t.equal(next.value[0], 'first');
  t.equal(next.value[1], 'Bob');
  next = await it.next();
  t.false(next.done);
  t.equal(next.value[0], 'last');
  t.equal(next.value[1], 'Smith');
  await noNext(t, it);
  t.end();
});
