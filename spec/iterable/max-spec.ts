import '../iterablehelpers';
import { max } from 'ix/iterable/index.js';

test('Itearble#max laws', () => {
  const xs = [5, 3, 1, 2, 4];
  expect(max(xs)).toBe(max(xs, { selector: (x) => x }));
});

test('Iterable#max empty throws', () => {
  expect(() => max([])).toThrow();
});

test('Iterable#max', () => {
  const xs = [5, 3, 1, 2, 4];
  expect(max(xs)).toBe(5);
});

test('Iterable#max with selector empty throws', () => {
  expect(() => max([], { selector: (x) => x * 2 })).toThrow();
});

test('Iterable#max with selector', () => {
  const xs = [5, 3, 1, 2, 4];
  expect(max(xs, { selector: (x) => x * 2 })).toBe(10);
});
