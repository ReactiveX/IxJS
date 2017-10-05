import * as Ix from '../Ix';
import * as test from 'tape-async';
const { _throw } = Ix.asynciterable;

test('AsyncIterable#throw throws', async t => {
  const xs = _throw<number>(new Error());

  const it = xs[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
