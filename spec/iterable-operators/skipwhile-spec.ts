import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.skipWhile]);
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#skipWhile skips some', ([skipWhile]) => {
  const xs = [1, 2, 3, 4];
  const ys = skipWhile(xs, x => x < 3);

  const it = ys[Symbol.iterator]();
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#skipWhile skips none', ([skipWhile]) => {
  const xs = [1, 2, 3, 4];
  const ys = skipWhile(xs, () => false);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#skipWhile skips all', ([skipWhile]) => {
  const xs = [1, 2, 3, 4];
  const ys = skipWhile(xs, () => true);

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#skipWhile skips some another run', ([skipWhile]) => {
  const xs = [1, 2, 3, 4, 3, 2, 1];
  const ys = skipWhile(xs, x => x < 3);

  const it = ys[Symbol.iterator]();
  hasNext(it, 3);
  hasNext(it, 4);
  hasNext(it, 3);
  hasNext(it, 2);
  hasNext(it, 1);
  noNext(it);
});

test('Iterable#skipWhile predicate throws', ([skipWhile]) => {
  const xs = [1, 2, 3, 4];
  const ys = skipWhile(xs, () => {
    throw new Error();
  });

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#skipWhile with index', ([skipWhile]) => {
  const xs = [1, 2, 3, 4];
  const ys = skipWhile(xs, (_, i) => i < 2);

  const it = ys[Symbol.iterator]();
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});
