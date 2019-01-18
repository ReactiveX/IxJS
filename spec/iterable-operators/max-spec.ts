import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.max]);

test('Itearble#max laws', ([max]) => {
  const xs = [5, 3, 1, 2, 4];
  expect(max(xs)).toBe(max(xs, x => x));
});

test('Iterable#max empty throws', ([max]) => {
  expect(() => max([])).toThrow();
});

test('Iterable#max', ([max]) => {
  const xs = [5, 3, 1, 2, 4];
  expect(max(xs)).toBe(5);
});

test('Iterable#max with selector empty throws', ([max]) => {
  expect(() => max([], x => x * 2)).toThrow();
});

test('Iterable#max with selector', ([max]) => {
  const xs = [5, 3, 1, 2, 4];
  expect(max(xs, x => x * 2)).toBe(10);
});
