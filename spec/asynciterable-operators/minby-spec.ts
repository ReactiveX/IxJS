import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.minBy]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.asynciterable;

test('AsyncIterable#minBy', async ([minBy]) => {
  const source = of(2, 5, 0, 7, 4, 3, 6, 2, 1);

  const res = minBy(source, async x => x % 3);
  expect(await sequenceEqual(res, of(0, 3, 6))).toBeTruthy();
});

test('AsyncIterable#minBy empty throws', async ([minBy]) => {
  const source = empty<number>();

  try {
    await minBy(source, async x => x % 3);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
