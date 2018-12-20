import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.distinctUntilChanged]);
const { sequenceEqual } = Ix.iterable;

test('Iterable#distinctUntilChanged no selector', ([distinctUntilChanged]) => {
  const res = distinctUntilChanged([1, 2, 2, 3, 3, 3, 2, 2, 1]);
  expect(sequenceEqual(res, [1, 2, 3, 2, 1])).toBeTruthy();
});

test('Iterable#distinctUntilChanged with selector', ([distinctUntilChanged]) => {
  const res = distinctUntilChanged([1, 1, 2, 3, 4, 5, 5, 6, 7], x => Math.floor(x / 2));
  expect(sequenceEqual(res, [1, 2, 4, 6])).toBeTruthy();
});
