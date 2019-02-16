import { of } from 'ix/asynciterable';
import { takeWhile } from 'ix/asynciterable/operators';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#takeWhile some match', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(takeWhile(x => x < 3));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#takeWhile no match', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(takeWhile(() => false));

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncItearble#takeWhile all match', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = takeWhile(xs, () => true);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#takeWhile uses index', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(takeWhile((_, i) => i < 2));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#takeWhile predicate throws', async () => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(
    takeWhile(() => {
      throw err;
    })
  );

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});
