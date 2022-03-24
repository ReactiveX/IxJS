import { hasNext, noNext } from '../iterablehelpers';
import { IterableX } from 'ix/iterable';
import { orderBy, orderByDescending, thenBy, thenByDescending } from 'ix/iterable/operators';

test('Iterable#orderBy normal ordering', () => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = IterableX.from(xs).pipe(orderBy((x) => x));

  const it = ys[Symbol.iterator]();
  for (let i = 0; i < 10; i++) {
    hasNext(it, i);
  }

  noNext(it);
});

test('Iterable#orderBy normal ordering with thenBy throws', () => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = IterableX.from(xs)
    .pipe(orderBy((x) => x))
    .pipe(
      thenBy(() => {
        throw new Error();
      })
    );

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#orderBy selector throws', () => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = IterableX.from(xs).pipe(
    orderBy(() => {
      throw new Error();
    })
  );

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#orderByDescending normal ordering', () => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = IterableX.from(xs).pipe(orderByDescending((x) => x));

  const it = ys[Symbol.iterator]();
  for (let i = 9; i >= 0; i--) {
    hasNext(it, i);
  }

  noNext(it);
});

test('Iterable#orderByDescending normal ordering with thenByDescending throws', () => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = IterableX.from(xs)
    .pipe(orderByDescending((x) => x))
    .pipe(
      thenByDescending(() => {
        throw new Error();
      })
    );

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
