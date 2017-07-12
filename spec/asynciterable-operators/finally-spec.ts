import * as Ix from '../Ix';
import * as test from 'tape';
const { _finally } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#finally defers behavior', async t => {
  let done = false;

  const xs = _finally(range(0, 2), async () => { done = true; });
  t.false(done);

  const it = xs[Symbol.asyncIterator]();
  t.false(done);

  await hasNext(t, it, 0);
  t.false(done);

  await hasNext(t, it, 1);
  t.false(done);

  await noNext(t, it);
  t.true(done);

  t.end();
});

test('AsyncIterable#finally calls even with error', async t => {
  let done = false;

  const err = new Error();
  const xs = _finally(_throw(err), async () => { done = true; });
  t.false(done);

  const it = xs[Symbol.asyncIterator]();
  t.false(done);

  try {
    await hasNext(t, it, 0);
  } catch (e) {
    t.same(err, e);
  }

  t.true(done);
  t.end();
});
