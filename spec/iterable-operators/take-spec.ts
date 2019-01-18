import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.take]);
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#take zero or less takes nothing', ([take]) => {
  const xs = [1, 2, 3, 4];
  const ys = take(xs, -2);

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#take less than count', ([take]) => {
  const xs = [1, 2, 3, 4];
  const ys = take(xs, 2);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#take more than count', ([take]) => {
  const xs = [1, 2, 3, 4];
  const ys = take(xs, 10);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#take throws with error', ([take]) => {
  const xs = _throw<number>(new Error());
  const ys = take(xs, 2);

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
