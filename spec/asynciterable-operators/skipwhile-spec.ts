import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.skipWhile]);
const { of } = Ix.AsyncIterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#skipWhile skips some', async ([skipWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = skipWhile(xs, async x => x < 3);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#skipWhile skips none', async ([skipWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = skipWhile(xs, async () => false);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#skipWhile skips all', async ([skipWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = skipWhile(xs, async () => true);

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#skipWhile skips some another run', async ([skipWhile]) => {
  const xs = of(1, 2, 3, 4, 3, 2, 1);
  const ys = skipWhile(xs, x => x < 3);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await hasNext(it, 4);
  await hasNext(it, 3);
  await hasNext(it, 2);
  await hasNext(it, 1);
  await noNext(it);
});

test('AsyncIterable#skipWhile predicate throws', async ([skipWhile]) => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);
  const ys = skipWhile(xs, () => {
    throw err;
  });

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#skipWhile with index', async ([skipWhile]) => {
  const xs = of(1, 2, 3, 4);
  const ys = skipWhile(xs, async (_, i) => i < 2);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});
