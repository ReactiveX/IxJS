import { count } from 'ix/iterable';

test('Iterable#count no predicate empty', () => {
  expect(count<number>([])).toBe(0);
});

test('Iterable#count no predicate non-empty', () => {
  expect(count([1, 2, 3])).toBe(3);
});

test('Iterable#count predicate empty', () => {
  expect(count<number>([], x => x < 3)).toBe(0);
});

test('Iterable#count predicate some', () => {
  expect(count([1, 2, 3], x => x < 3)).toBe(2);
});
