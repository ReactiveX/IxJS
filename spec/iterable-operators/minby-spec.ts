import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.minBy]);
const { sequenceEqual } = Ix.iterable;

test('Iterable#minBy', ([minBy]) => {
  const source = [2, 5, 0, 7, 4, 3, 6, 2, 1];

  const res = minBy(source, x => x % 3);
  expect(sequenceEqual(res, [0, 3, 6])).toBeTruthy();
});

test('Iterable#minBy empty throws', ([minBy]) => {
  const source: number[] = [];

  try {
    minBy(source, x => x % 3);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
