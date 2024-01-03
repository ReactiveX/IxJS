import '../iterablehelpers';
import { toMap } from 'ix/iterable/index.js';

test('Iterable#toMap stores values', () => {
  const res = toMap([1, 4], { keySelector: (x) => x % 2 });
  expect(res.get(0)).toBe(4);
  expect(res.get(1)).toBe(1);
});

test('Iterable#toMap overwrites duplicates', () => {
  const res = toMap([1, 4, 2], { keySelector: (x) => x % 2 });
  expect(res.get(0)).toBe(2);
  expect(res.get(1)).toBe(1);
});

test('Iterable#toMap with element selector', () => {
  const res = toMap([1, 4], { keySelector: (x) => x % 2, elementSelector: (x) => x + 1 });
  expect(res.get(0)).toBe(5);
  expect(res.get(1)).toBe(2);
});

test('Iterable#toMap with element selector overwrites duplicates', () => {
  const res = toMap([1, 4, 2], { keySelector: (x) => x % 2, elementSelector: (x) => x + 1 });
  expect(res.get(0)).toBe(3);
  expect(res.get(1)).toBe(2);
});
