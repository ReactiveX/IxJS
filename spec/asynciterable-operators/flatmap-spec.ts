import * as Ix from '../Ix';
import * as test from 'tape-async';
const { flatMap } = Ix.asynciterable;
const { of } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('Iterable#flatMap with range', async t => {
  const xs = of(1, 2, 3);
  const ys = flatMap(xs, async x => range(0, x));

  const it = ys[Symbol.asyncIterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});

test('Iterable#flatMap selector returns throw', async t => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = flatMap(xs, async x => x < 3 ? range(0, x) : _throw(err));

  const it = ys[Symbol.asyncIterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('Iterable#flatMap with error throws', async t => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = flatMap(xs, x => range(0, x));

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('Iterable#flatMap selector throws error', async t => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = flatMap(xs, async x => {
    if (x < 3) { return range(0, x); }
    throw err;
  });

  const it = ys[Symbol.asyncIterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
