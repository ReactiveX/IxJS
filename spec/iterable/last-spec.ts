import '../iterablehelpers';
import { last } from 'ix/iterable';

test('Iterable#last empty returns undefined', () => {
  expect(last<number>([])).toBeUndefined();
});

test('Iterable#last no predicate returns first', () => {
  expect(last([1, 2, 3])).toBe(3);
});

test('Iterable#last predicate empty returns undefined', () => {
  expect(
    last<number>([], { predicate: () => true })
  ).toBeUndefined();
});

test('Iterable#last predicate hits returns value', () => {
  expect(last([1, 2, 3, 4, 5], { predicate: (x) => x % 2 === 0 })).toBe(4);
});

test('Iterable#last predicate misses returns undefined', () => {
  expect(last([1, 3, 5], { predicate: (x) => x % 2 === 0 })).toBeUndefined();
});
