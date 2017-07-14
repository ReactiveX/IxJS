import * as Ix from '../Ix';
import * as test from 'tape';
const { of } = Ix.asynciterable;
const { orderBy, orderByDescending, thenBy, thenByDescending } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#orderBy normal ordering', async t => {
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = orderBy(xs, x => x);

  const it = ys[Symbol.asyncIterator]();
  for (let i = 0; i < 10; i++) {
    await hasNext(t, it, i);
  }

  await noNext(t, it);
  t.end();
});

test('AsyncIterable#orderBy normal ordering with thenBy throws', async t => {
  const err = new Error();
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = thenBy(orderBy(xs, x => x), () => { throw err; });

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#orderBy selector throws', async t => {
  const err = new Error();
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = orderBy(xs, () => { throw err; });

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#orderByDescending normal ordering', async t => {
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = orderByDescending(xs, x => x);

  const it = ys[Symbol.asyncIterator]();
  for (let i = 9; i >= 0; i--) {
    await hasNext(t, it, i);
  }

  await noNext(t, it);
  t.end();
});

test('AsyncIterable#orderByDescending normal ordering with thenByDescending throws', async t => {
  const err = new Error();
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = thenByDescending(orderByDescending(xs, x => x), () => { throw err; });

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
