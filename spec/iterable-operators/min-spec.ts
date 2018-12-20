import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.min]);

test('Itearble#min laws', ([min]) => {
  const xs = [5, 3, 1, 2, 4];
  expect(min(xs)).toBe(min(xs, x => x));
});

test('Iterable#min empty throws', ([min]) => {
  expect(() => min([])).toThrow();
});

test('Iterable#min', ([min]) => {
  const xs = [5, 3, 1, 2, 4];
  expect(min(xs)).toBe(1);
});

test('Iterable#min with selector empty throws', ([min]) => {
  expect(() => min([], x => x * 2)).toThrow();
});

test('Iterable#min with selector', ([min]) => {
  const xs = [5, 3, 1, 2, 4];
  expect(min(xs, x => x * 2)).toBe(2);
});
