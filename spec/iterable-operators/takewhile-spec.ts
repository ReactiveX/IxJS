import { hasNext, noNext } from '../iterablehelpers';
import { takeWhile } from 'ix/iterable/operators';
import { from } from 'ix/iterable';

test('Iterable#takeWhile some match', () => {
  const xs = [1, 2, 3, 4];
  const ys = from(xs).pipe(takeWhile((x) => x < 3));

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#takeWhile no match', () => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(() => false)(xs);

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Itearble#takeWhile all match', () => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(() => true)(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#takeWhile uses index', () => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile((_, i) => i < 2)(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#takeWhile predicate throws', () => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(() => {
    throw new Error();
  })(xs);

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
