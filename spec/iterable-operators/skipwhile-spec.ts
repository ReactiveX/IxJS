import { hasNext, noNext } from '../iterablehelpers';
import { skipWhile } from 'ix/iterable/operators';
import { as } from 'ix/iterable';

test('Iterable#skipWhile skips some', () => {
  const xs = [1, 2, 3, 4];
  const ys = as(xs).pipe(skipWhile((x) => x < 3));

  const it = ys[Symbol.iterator]();
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#skipWhile skips none', () => {
  const xs = [1, 2, 3, 4];
  const ys = as(xs).pipe(skipWhile(() => false));

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#skipWhile skips all', () => {
  const xs = [1, 2, 3, 4];
  const ys = as(xs).pipe(skipWhile(() => true));

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#skipWhile skips some another run', () => {
  const xs = [1, 2, 3, 4, 3, 2, 1];
  const ys = as(xs).pipe(skipWhile((x) => x < 3));

  const it = ys[Symbol.iterator]();
  hasNext(it, 3);
  hasNext(it, 4);
  hasNext(it, 3);
  hasNext(it, 2);
  hasNext(it, 1);
  noNext(it);
});

test('Iterable#skipWhile predicate throws', () => {
  const xs = [1, 2, 3, 4];
  const ys = as(xs).pipe(
    skipWhile(() => {
      throw new Error();
    })
  );

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#skipWhile with index', () => {
  const xs = [1, 2, 3, 4];
  const ys = as(xs).pipe(skipWhile((_, i) => i < 2));

  const it = ys[Symbol.iterator]();
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});
