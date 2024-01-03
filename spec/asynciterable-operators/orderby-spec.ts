import { hasNext, noNext } from '../asynciterablehelpers.js';
import { of } from 'ix/asynciterable/index.js';
import {
  orderBy,
  orderByDescending,
  thenBy,
  thenByDescending,
} from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#orderBy normal ordering', async () => {
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = xs.pipe(orderBy((x) => x));

  const it = ys[Symbol.asyncIterator]();
  for (let i = 0; i < 10; i++) {
    await hasNext(it, i);
  }

  await noNext(it);
});

test('AsyncIterable#orderBy normal ordering with thenBy throws', async () => {
  const err = new Error();
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = xs.pipe(
    orderBy((x) => x),
    thenBy(() => {
      throw err;
    })
  );

  const it = ys[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow(err);
});

test('AsyncIterable#orderBy selector throws', async () => {
  const err = new Error();
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = xs.pipe(
    orderBy(() => {
      throw err;
    })
  );

  const it = ys[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow(err);
});

test('AsyncIterable#orderByDescending normal ordering', async () => {
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = xs.pipe(orderByDescending((x) => x));

  const it = ys[Symbol.asyncIterator]();
  for (let i = 9; i >= 0; i--) {
    await hasNext(it, i);
  }

  await noNext(it);
});

test('AsyncIterable#orderByDescending normal ordering with thenByDescending throws', async () => {
  const err = new Error();
  const xs = of(2, 6, 1, 5, 7, 8, 9, 3, 4, 0);
  const ys = xs.pipe(
    orderByDescending((x) => x),
    thenByDescending(() => {
      throw err;
    })
  );

  const it = ys[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow(err);
});
