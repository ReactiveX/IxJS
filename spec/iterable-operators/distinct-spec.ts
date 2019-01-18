import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.distinct]);
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;

test('Iterable#distinct selector', ([distinct]) => {
  const res = distinct(range(0, 10), x => x % 5);
  expect(sequenceEqual(res, range(0, 5))).toBeTruthy();
});

function testComparer(x: number, y: number): boolean {
  return x % 2 === y % 2;
}

test('Iterable#distinct with comparer', ([distinct]) => {
  const res = distinct(range(0, 10), x => x % 5, testComparer);
  expect(sequenceEqual(res, [0, 1])).toBeTruthy();
});
