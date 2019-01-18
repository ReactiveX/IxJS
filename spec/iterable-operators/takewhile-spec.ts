import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.takeWhile]);
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#takeWhile some match', ([takeWhile]) => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(xs, x => x < 3);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#takeWhile no match', ([takeWhile]) => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(xs, () => false);

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Itearble#takeWhile all match', ([takeWhile]) => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(xs, () => true);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#takeWhile uses index', ([takeWhile]) => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(xs, (_, i) => i < 2);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#takeWhile predicate throws', ([takeWhile]) => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(xs, () => {
    throw new Error();
  });

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
