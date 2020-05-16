import { hasNext, noNext } from '../iterablehelpers';
import { groupJoin } from 'ix/iterable/operators';
import { from, reduce, throwError } from 'ix/iterable';

test('Iterable#groupJoin all groups have values', () => {
  const xs = [0, 1, 2];
  const ys = [4, 7, 6, 2, 3, 4, 8, 9];
  const res = from(xs).pipe(
    groupJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (x, i) => x + ' - ' + reduce(i, { callback: (s, j) => s + j, seed: '' })
    )
  );

  const it = res[Symbol.iterator]();
  hasNext(it, '0 - 639');
  hasNext(it, '1 - 474');
  hasNext(it, '2 - 28');
  noNext(it);
});

test('Iterable#groupJoin some groups have values', () => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = from(xs).pipe(
    groupJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (x, i) => x + ' - ' + reduce(i, { callback: (s, j) => s + j, seed: '' })
    )
  );

  const it = res[Symbol.iterator]();
  hasNext(it, '0 - 36');
  hasNext(it, '1 - 4');
  hasNext(it, '2 - ');
  noNext(it);
});

test('Iterable#groupJoin left throws', () => {
  const xs = throwError(new Error());
  const ys = [3, 6, 4];
  const res = from(xs).pipe(
    groupJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (x, i) => x + ' - ' + reduce(i, { callback: (s, j) => s + j, seed: '' })
    )
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#groupJoin right throws', () => {
  const xs = [0, 1, 2];
  const ys = throwError(new Error());
  const res = from(xs).pipe(
    groupJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (x, i) => x + ' - ' + reduce(i, { callback: (s, j) => s + j, seed: '' })
    )
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#groupJoin left selector throws', () => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = from(xs).pipe(
    groupJoin(
      ys,
      (_) => {
        throw new Error();
      },
      (y) => y % 3,
      (x, i) => x + ' - ' + reduce(i, { callback: (s, j) => s + j, seed: '' })
    )
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#groupJoin right selector throws', () => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = from(xs).pipe(
    groupJoin(
      ys,
      (x) => x % 3,
      (_) => {
        throw new Error();
      },
      (x, i) => x + ' - ' + reduce(i, { callback: (s, j) => s + j, seed: '' })
    )
  );

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#groupJoin result selector eventually throws', () => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = from(xs).pipe(
    groupJoin(
      ys,
      (x) => x % 3,
      (y) => y % 3,
      (x, i) => {
        if (x === 1) {
          throw new Error();
        }
        return x + ' - ' + reduce(i, { callback: (s, j) => s + j, seed: '' });
      }
    )
  );

  const it = res[Symbol.iterator]();
  hasNext(it, '0 - 36');
  expect(() => it.next()).toThrow();
});
