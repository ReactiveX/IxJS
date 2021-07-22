import '../iterablehelpers';
import { first } from 'ix/iterable';

test('Iterable#first empty returns undefined', () => {
  expect(first<number>([])).toBeUndefined();
});

test('Iterable#first no predicate returns first', () => {
  expect(first([1, 2, 3])).toBe(1);
});

test('Iterable#first predicate empty returns undefined', () => {
  expect(
    first<number>([], { predicate: () => true })
  ).toBeUndefined();
});

test('Iterable#first predicate hits returns value', () => {
  expect(first([1, 2, 3], { predicate: (x) => x % 2 === 0 })).toBe(2);
});

test('Iterable#first predicate misses returns undefined', () => {
  expect(first([1, 3, 5], { predicate: (x) => x % 2 === 0 })).toBeUndefined();
});
