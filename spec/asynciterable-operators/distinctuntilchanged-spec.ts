import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.distinctUntilChanged]);
const { of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.asynciterable;

test('Iterable#distinctUntilChanged no selector', async ([distinctUntilChanged]) => {
  const res = distinctUntilChanged(of(1, 2, 2, 3, 3, 3, 2, 2, 1));
  expect(await sequenceEqual(res, of(1, 2, 3, 2, 1))).toBeTruthy();
});

test('Iterable#distinctUntilChanged with selector', async ([distinctUntilChanged]) => {
  const res = distinctUntilChanged(of(1, 1, 2, 3, 4, 5, 5, 6, 7), x => Math.floor(x / 2));
  expect(await sequenceEqual(res, of(1, 2, 4, 6))).toBeTruthy();
});
