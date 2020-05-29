import { hasNext, noNext } from '../asynciterablehelpers';
import { skipWhile } from 'ix/asynciterable/operators';
import { of } from 'ix/asynciterable';

test('AsyncIterable#skipWhile skips some', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(skipWhile(async (x) => x < 3));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#skipWhile skips none', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(skipWhile(async () => false));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#skipWhile skips all', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(skipWhile(async () => true));

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#skipWhile skips some another run', async () => {
  const xs = of(1, 2, 3, 4, 3, 2, 1);
  const ys = xs.pipe(skipWhile((x) => x < 3));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await hasNext(it, 4);
  await hasNext(it, 3);
  await hasNext(it, 2);
  await hasNext(it, 1);
  await noNext(it);
});

test('AsyncIterable#skipWhile predicate throws', async () => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(
    skipWhile(() => {
      throw err;
    })
  );

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e).toEqual(err);
  }
});

test('AsyncIterable#skipWhile with index', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(skipWhile(async (_, i) => i < 2));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});
