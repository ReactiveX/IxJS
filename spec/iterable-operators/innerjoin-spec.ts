import { hasNext, noNext } from '../iterablehelpers';
import { IterableX, throwError } from 'ix/iterable';
import { innerJoin } from 'ix/iterable/operators';

test('Iterable#innerJoin normal', () => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = IterableX.from(xs).pipe(
    innerJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (x, y) => x + y
    )
  );

  const it = res[Symbol.iterator]();
  hasNext(it, 0 + 3);
  hasNext(it, 0 + 6);
  hasNext(it, 1 + 4);
  noNext(it);
});

test('Iterable#innerJoin reversed', () => {
  const xs = [3, 6, 4];
  const ys = [0, 1, 2];
  const res = IterableX.from(xs).pipe(
    innerJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (x, y) => x + y
    )
  );

  const it = res[Symbol.iterator]();
  hasNext(it, 3 + 0);
  hasNext(it, 6 + 0);
  hasNext(it, 4 + 1);
  noNext(it);
});

test('Iterable#innerJoin only one group matches', () => {
  const xs = [0, 1, 2];
  const ys = [3, 6];
  const res = IterableX.from(xs).pipe(
    innerJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (x, y) => x + y
    )
  );

  const it = res[Symbol.iterator]();
  hasNext(it, 0 + 3);
  hasNext(it, 0 + 6);
  noNext(it);
});

test('Iterable#innerJoin only one group matches reversed', () => {
  const xs = [3, 6];
  const ys = [0, 1, 2];
  const res = IterableX.from(xs).pipe(
    innerJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (x, y) => x + y
    )
  );

  const it = res[Symbol.iterator]();
  hasNext(it, 3 + 0);
  hasNext(it, 6 + 0);
  noNext(it);
});

test('Iterable#innerJoin left throws', () => {
  const xs = throwError(new Error());
  const ys = [3, 6, 4];
  const res = IterableX.from(xs).pipe(
    innerJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (x, y) => x + y
    )
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#innerJoin right throws', () => {
  const xs = [0, 1, 2];
  const ys = throwError(new Error());
  const res = IterableX.from(xs).pipe(
    innerJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (x, y) => x + y
    )
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#innerJoin left selector throws', () => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = IterableX.from(xs).pipe(
    innerJoin(
      ys,
      (_) => {
        throw new Error();
      },
      (y) => y % 3,
      (x, y) => x + y
    )
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#join right selector throws', () => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = IterableX.from(xs).pipe(
    innerJoin(
      ys,
      (x) => x % 3,
      (_) => {
        throw new Error();
      },
      (x, y) => x + y
    )
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#innerJoin result selector throws', () => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = IterableX.from(xs).pipe(
    innerJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (_x, _y) => {
        throw new Error();
      }
    )
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
