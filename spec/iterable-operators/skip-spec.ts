import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.skip]);
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#skip skips some', ([skip]) => {
  const xs = [1, 2, 3, 4];
  const ys = skip(xs, 2);

  const it = ys[Symbol.iterator]();
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#skip skips more than count', ([skip]) => {
  const xs = [1, 2, 3, 4];
  const ys = skip(xs, 10);

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#skip none', ([skip]) => {
  const xs = [1, 2, 3, 4];
  const ys = skip(xs, 0);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#skip throws', ([skip]) => {
  const xs = _throw<number>(new Error());
  const ys = skip(xs, 2);

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
