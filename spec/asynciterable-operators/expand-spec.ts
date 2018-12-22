import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.expand]);
const { of } = Ix.AsyncIterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { take } = Ix.asynciterable;

test('Iterable#expand with single return behavior', async ([expand]) => {
  const res = take(expand(of(0), async x => of(x + 1)), 10);
  expect(await sequenceEqual(res, range(0, 10))).toBeTruthy();
});

test('Iterable#expand with range return behavior', async ([expand]) => {
  const res = expand(of(3), async x => range(0, x));
  const exp = of(3, 0, 1, 2, 0, 0, 1, 0);

  expect(await sequenceEqual(res, exp)).toBeTruthy();
});
