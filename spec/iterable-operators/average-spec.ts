import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.average]);

test('Iterable#average empty', ([average]) => {
  expect(() => average([])).toThrow();
});

test('Iterable#average', ([average]) => {
  const res = average([1, 2, 3]);
  expect(res).toBe(2);
});

test('Iterable#average with selector empty', ([average]) => {
  expect(() => average<number>([], x => x * 2)).toThrow();
});

test('Iterable#average with selector', ([average]) => {
  const res = average([1, 2, 3], x => x * 2);
  expect(res).toBe(4);
});

test('Iterable#average laws', ([average]) => {
  const xs = [1, 2, 3];
  expect(average(xs)).toBe(average(xs, x => x));
});
