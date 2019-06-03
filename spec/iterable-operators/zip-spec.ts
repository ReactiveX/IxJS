import { hasNext, noNext } from '../iterablehelpers';
import { throwError, zip } from 'ix/iterable';

test('Iterable#zip equal length', () => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(it, 1 * 4);
  hasNext(it, 2 * 5);
  hasNext(it, 3 * 6);
  noNext(it);
});

test('Iterable#zip left longer', () => {
  const xs = [1, 2, 3, 4];
  const ys = [4, 5, 6];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(it, 1 * 4);
  hasNext(it, 2 * 5);
  hasNext(it, 3 * 6);
  noNext(it);
});

test('Iterable#zip right longer', () => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6, 7];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(it, 1 * 4);
  hasNext(it, 2 * 5);
  hasNext(it, 3 * 6);
  noNext(it);
});

test('Iterable#zip multiple sources', () => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6, 7];
  const zs = [8, 9, 10];
  const res = zip(([x, y, z]) => x * y * z, xs, ys, zs);

  const it = res[Symbol.iterator]();
  hasNext(it, 1 * 4 * 8);
  hasNext(it, 2 * 5 * 9);
  hasNext(it, 3 * 6 * 10);
  noNext(it);
});

test('Iterable#zip left throws', () => {
  const xs = throwError<number>(new Error());
  const ys = [4, 5, 6];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#zip right throws', () => {
  const xs = [1, 2, 3];
  const ys = throwError<number>(new Error());
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#zip selector throws', () => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6];
  const res = zip(
    ([x, y]) => {
      if (x > 0) {
        throw new Error();
      }
      return x * y;
    },
    xs,
    ys
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
