import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.count]);

test('Iterable#count no predicate empty', ([count]) => {
  expect(count<number>([])).toBe(0);
});

test('Iterable#count no predicate non-empty', ([count]) => {
  expect(count([1, 2, 3])).toBe(3);
});

test('Iterable#count predicate empty', ([count]) => {
  expect(count<number>([], x => x < 3)).toBe(0);
});

test('Iterable#count predicate some', ([count]) => {
  expect(count([1, 2, 3], x => x < 3)).toBe(2);
});
