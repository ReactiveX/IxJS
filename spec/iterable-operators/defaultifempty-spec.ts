import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.defaultIfEmpty]);
const { empty } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#defaultIfEmpty with empty', ([defaultIfEmpty]) => {
  const xs = empty<number>();
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.iterator]();
  hasNext(it, 0);
  noNext(it);
});

test('Iterable#defaultIfEmpty with no empty', ([defaultIfEmpty]) => {
  const xs = [42];
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.iterator]();
  hasNext(it, 42);
  noNext(it);
});

test('Iterable#defaultIfEmpty throws', ([defaultIfEmpty]) => {
  const xs = _throw<number>(new Error());
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
