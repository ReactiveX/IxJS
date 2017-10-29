import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.takeWhile]);
const { of } = Ix.AsyncIterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#takeWhile some match', async (t, [takeWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = takeWhile(xs, x => x < 3);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#takeWhile no match', async (t, [takeWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = takeWhile(xs, () => false);

  const it = ys[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncItearble#takeWhile all match', async (t, [takeWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = takeWhile(xs, () => true);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#takeWhile uses index', async (t, [takeWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = takeWhile(xs, (x, i) => i < 2);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#takeWhile predicate throws', async (t, [takeWhile]) => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);
  const ys = takeWhile(xs, () => {
    throw err;
  });

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
