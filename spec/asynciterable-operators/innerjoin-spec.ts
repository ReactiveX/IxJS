import { hasNext, noNext } from '../asynciterablehelpers';
import { of, throwError } from 'ix/asynciterable';
import { innerJoin } from 'ix/asynciterable/operators';

test('AsyncIterable#innerJoin normal', async () => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = xs.pipe(
    innerJoin(
      ys,
      async (x) => x % 3,
      async (y) => y % 3,
      async (x, y) => x + y
    )
  );

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 0 + 3);
  await hasNext(it, 0 + 6);
  await hasNext(it, 1 + 4);
  await noNext(it);
});

test('AsyncIterable#innerJoin reversed', async () => {
  const xs = of(3, 6, 4);
  const ys = of(0, 1, 2);
  const res = xs.pipe(
    innerJoin(
      ys,
      async (x) => x % 3,
      async (y) => y % 3,
      async (x, y) => x + y
    )
  );

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 3 + 0);
  await hasNext(it, 6 + 0);
  await hasNext(it, 4 + 1);
  await noNext(it);
});

test('AsyncIterable#innerJoin only one group matches', async () => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6);
  const res = xs.pipe(
    innerJoin(
      ys,
      async (x) => x % 3,
      async (y) => y % 3,
      async (x, y) => x + y
    )
  );

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 0 + 3);
  await hasNext(it, 0 + 6);
  await noNext(it);
});

test('AsyncIterable#innerJoin only one group matches reversed', async () => {
  const xs = of(3, 6);
  const ys = of(0, 1, 2);
  const res = xs.pipe(
    innerJoin(
      ys,
      async (x) => x % 3,
      async (y) => y % 3,
      async (x, y) => x + y
    )
  );

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 3 + 0);
  await hasNext(it, 6 + 0);
  await noNext(it);
});

test('AsyncIterable#innerJoin left throws', async () => {
  const xs = throwError(new Error());
  const ys = of(3, 6, 4);
  const res = xs.pipe(
    innerJoin(
      ys,
      async (x) => x % 3,
      async (y) => y % 3,
      async (x, y) => x + y
    )
  );

  const it = res[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow();
});

test('AsyncIterable#innerJoin right throws', async () => {
  const xs = of(0, 1, 2);
  const ys = throwError(new Error());
  const res = xs.pipe(
    innerJoin(
      ys,
      async (x) => x % 3,
      async (y) => y % 3,
      async (x, y) => x + y
    )
  );

  const it = res[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow();
});

test('AsyncIterable#innerJoin left selector throws', async () => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = xs.pipe(
    innerJoin(
      ys,
      async (_) => {
        throw new Error();
      },
      async (y) => y % 3,
      async (x, y) => x + y
    )
  );

  const it = res[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow();
});

test('AsyncIterable#innerJoin right selector throws', async () => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = xs.pipe(
    innerJoin(
      ys,
      async (x) => x % 3,
      async (_) => {
        throw new Error();
      },
      async (x, y) => x + y
    )
  );

  const it = res[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow();
});

test('AsyncIterable#innerJoin result selector throws', async () => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = xs.pipe(
    innerJoin(
      ys,
      async (x) => x % 3,
      async (y) => y % 3,
      async (_x, _y) => {
        throw new Error();
      }
    )
  );

  const it = res[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow();
});
