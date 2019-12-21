import { hasNext, noNext } from '../asynciterablehelpers';
import { of, throwError, zip } from 'ix/asynciterable';

test('AsyncIterable#zip equal length', async () => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6);
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1 * 4);
  await hasNext(it, 2 * 5);
  await hasNext(it, 3 * 6);
  await noNext(it);
});

test('AsyncIterable#zip left longer', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = of(4, 5, 6);
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1 * 4);
  await hasNext(it, 2 * 5);
  await hasNext(it, 3 * 6);
  await noNext(it);
});

test('AsyncIterable#zip right longer', async () => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6, 7);
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1 * 4);
  await hasNext(it, 2 * 5);
  await hasNext(it, 3 * 6);
  await noNext(it);
});

test('AsyncIterable#zip multiple sources', async () => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6, 7);
  const zs = of(8, 9, 10);
  const res = zip(([x, y, z]) => x * y * z, xs, ys, zs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1 * 4 * 8);
  await hasNext(it, 2 * 5 * 9);
  await hasNext(it, 3 * 6 * 10);
  await noNext(it);
});

test('AsyncIterable#zip left throws', async () => {
  const err = new Error();
  const xs = throwError<number>(err);
  const ys = of(4, 5, 6);
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#zip right throws', async () => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = throwError<number>(err);
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#zip selector throws', async () => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6);
  const res = zip(
    ([x, y]) => {
      if (x > 0) {
        throw err;
      }
      return x * y;
    },
    xs,
    ys
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});
