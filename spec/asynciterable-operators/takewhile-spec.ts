import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.takeWhile]);
const { of } = Ix.AsyncIterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#takeWhile some match', async ([takeWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = takeWhile(xs, x => x < 3);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#takeWhile no match', async ([takeWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = takeWhile(xs, () => false);

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncItearble#takeWhile all match', async ([takeWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = takeWhile(xs, () => true);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#takeWhile uses index', async ([takeWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = takeWhile(xs, (_, i) => i < 2);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#takeWhile predicate throws', async ([takeWhile]) => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);
  const ys = takeWhile(xs, () => {
    throw err;
  });

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});
