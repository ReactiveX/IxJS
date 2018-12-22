import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.maxBy]);
const { sequenceEqual } = Ix.iterable;

test('Iterable#maxBy', ([maxBy]) => {
  const source = [2, 5, 0, 7, 4, 3, 6, 2, 1];

  const res = maxBy(source, x => x % 3);
  expect(sequenceEqual(res, [2, 5, 2])).toBeTruthy();
});

test('Iterable#maxBy empty throws', ([maxBy]) => {
  const source: number[] = [];

  try {
    maxBy(source, x => x % 3);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
