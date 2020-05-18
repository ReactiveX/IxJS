import '../iterablehelpers';
import { min } from 'ix/iterable';

test('Itearble#min laws', () => {
  const xs = [5, 3, 1, 2, 4];
  expect(min(xs)).toBe(min(xs, { selector: (x) => x }));
});

test('Iterable#min empty throws', () => {
  expect(() => min([])).toThrow();
});

test('Iterable#min', () => {
  const xs = [5, 3, 1, 2, 4];
  expect(min(xs)).toBe(1);
});

test('Iterable#min with selector empty throws', () => {
  expect(() => min([], { selector: (x) => x * 2 })).toThrow();
});

test('Iterable#min with selector', () => {
  const xs = [5, 3, 1, 2, 4];
  expect(min(xs, { selector: (x) => x * 2 })).toBe(2);
});
