import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.toMap]);

test('Iterable#toMap stores values', ([toMap]) => {
  const res = toMap([1, 4], x => x % 2);
  expect(res.get(0)).toBe(4);
  expect(res.get(1)).toBe(1);
});

test('Iterable#toMap overwrites duplicates', ([toMap]) => {
  const res = toMap([1, 4, 2], x => x % 2);
  expect(res.get(0)).toBe(2);
  expect(res.get(1)).toBe(1);
});

test('Iterable#toMap with element selector', ([toMap]) => {
  const res = toMap([1, 4], x => x % 2, x => x + 1);
  expect(res.get(0)).toBe(5);
  expect(res.get(1)).toBe(2);
});

test('Iterable#toMap with element selector overwrites duplicates', ([toMap]) => {
  const res = toMap([1, 4, 2], x => x % 2, x => x + 1);
  expect(res.get(0)).toBe(3);
  expect(res.get(1)).toBe(2);
});
