import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.reduce]);
const { empty } = Ix.iterable;
const { of } = Ix.Iterable;

test('Iterable#reduce no seed', ([reduce]) => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduce(xs, (x, y, i) => x + y + i);
  expect(ys).toBe(20);
});

test('Iterable#reduce no seed empty throws', ([reduce]) => {
  const xs = empty<number>();
  expect(() => reduce(xs, (x, y, i) => x + y + i)).toThrow();
});

test('Iterable#reduce with seed', ([reduce]) => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduce(xs, (x, y, i) => x - y - i, 20);
  expect(ys).toBe(0);
});

test('Iterable#reduce with seed empty', ([reduce]) => {
  const xs = empty<number>();
  const ys = reduce(xs, (x, y, i) => x - y - i, 20);
  expect(ys).toBe(20);
});
