import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.first]);

test('Iterable#first empty returns undefined', ([first]) => {
  expect(first<number>([])).toBe(undefined);
});

test('Iterable#first no predicate returns first', ([first]) => {
  expect(first([1, 2, 3])).toBe(1);
});

test('Iterable#first predicate empty returns undefined', ([first]) => {
  expect(first<number>([], () => true)).toBe(undefined);
});

test('Iterable#first predicate hits returns value', ([first]) => {
  expect(first([1, 2, 3], x => x % 2 === 0)).toBe(2);
});

test('Iterable#first predicate misses returns undefined', ([first]) => {
  expect(first([1, 3, 5], x => x % 2 === 0)).toBe(undefined);
});
